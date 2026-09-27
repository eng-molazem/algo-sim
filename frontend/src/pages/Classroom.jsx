import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../api/socket';
import { getAlgorithmsByCategory, getAlgorithm } from '../algorithms/registry';
import { randomArray } from '../utils/randomArray';
import useSimulationEngine from '../engine/useSimulationEngine';
import SimulationVisualizer from '../components/SimulationVisualizer';
import ControlPanel from '../components/ControlPanel';

function AnnotationCanvas({ canDraw, onStroke, incomingStroke, clearSignal }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPoint = useRef(null);

  function getCtx() {
    return canvasRef.current?.getContext('2d');
  }

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!incomingStroke) return;
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const { from, to, color } = incomingStroke;
    ctx.strokeStyle = color || '#ef4444';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
    ctx.lineTo(to.x * canvas.width, to.y * canvas.height);
    ctx.stroke();
  }, [incomingStroke]);

  useEffect(() => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [clearSignal]);

  function toNormalized(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  }

  function handleDown(e) {
    if (!canDraw) return;
    drawing.current = true;
    lastPoint.current = toNormalized(e);
  }

  function handleMove(e) {
    if (!canDraw || !drawing.current) return;
    const point = toNormalized(e);
    const from = lastPoint.current;
    const ctx = getCtx();
    const canvas = canvasRef.current;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
    ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
    ctx.stroke();
    onStroke?.({ from, to: point, color: '#ef4444' });
    lastPoint.current = point;
  }

  function handleUp() {
    drawing.current = false;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${canDraw ? 'cursor-crosshair' : 'pointer-events-none'}`}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
    />
  );
}

function InstructorRoom() {
  const { t, lang } = useLanguage();
  const socket = getSocket();
  const [roomCode, setRoomCode] = useState('');
  const [students, setStudents] = useState([]);
  const [category] = useState('sorting');
  const algorithms = useMemo(() => getAlgorithmsByCategory(category), [category]);
  const [algorithmKey, setAlgorithmKey] = useState(algorithms[0]?.key);
  const [array, setArray] = useState(() => randomArray(8));
  const [clearSignal, setClearSignal] = useState(0);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState('نعم, لا');
  const [correctOption, setCorrectOption] = useState('');
  const [activePoll, setActivePoll] = useState(null);
  const [pollVotes, setPollVotes] = useState(null);
  const [pollDetail, setPollDetail] = useState(null);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(null);
  const breakIntervalRef = useRef(null);

  const parsedPollOptions = pollOptions.split(',').map((o) => o.trim()).filter(Boolean);

  const algorithm = getAlgorithm(algorithmKey);
  const snapshots = useMemo(() => {
    try {
      return algorithm.run([...array]);
    } catch {
      return [];
    }
  }, [algorithm, array]);
  const engine = useSimulationEngine(snapshots);

  useEffect(() => {
    socket.connect();
    socket.emit('classroom:create', {}, (ack) => setRoomCode(ack.roomCode));

    socket.on('classroom:roomUpdate', (summary) => setStudents(summary.students));
    socket.on('classroom:pollUpdate', ({ votes }) => setPollVotes(votes));
    socket.on('classroom:pollDetail', setPollDetail);
    socket.on('classroom:pollEnd', (final) => {
      setActivePoll(null);
      setPollVotes(final?.votes || null);
    });

    return () => {
      socket.off('classroom:roomUpdate');
      socket.off('classroom:pollUpdate');
      socket.off('classroom:pollDetail');
      socket.off('classroom:pollEnd');
      socket.disconnect();
      clearInterval(breakIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!roomCode) return;
    socket.emit('classroom:sync', { algorithmKey, array, stepIndex: engine.index });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomCode, algorithmKey, array, engine.index]);

  function newArray() {
    setArray(randomArray(8));
  }

  function startPoll(e) {
    e.preventDefault();
    const options = parsedPollOptions;
    if (!pollQuestion.trim() || options.length < 2) return;
    const correctIndex = correctOption ? options.indexOf(correctOption) : -1;
    socket.emit('classroom:pollStart', {
      question: pollQuestion.trim(),
      options,
      correctIndex: correctIndex >= 0 ? correctIndex : null,
    });
    setActivePoll({ question: pollQuestion.trim(), options, correctIndex: correctIndex >= 0 ? correctIndex : null });
    setPollVotes(new Array(options.length).fill(0));
    setPollDetail(null);
  }

  function endPoll() {
    socket.emit('classroom:pollEnd');
  }

  function startBreak(e) {
    e.preventDefault();
    const seconds = Math.max(1, Number(breakMinutes) || 1) * 60;
    socket.emit('classroom:breakStart', { seconds });
    setBreakSecondsLeft(seconds);
    clearInterval(breakIntervalRef.current);
    breakIntervalRef.current = setInterval(() => {
      setBreakSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(breakIntervalRef.current);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function endBreak() {
    socket.emit('classroom:breakEnd');
    clearInterval(breakIntervalRef.current);
    setBreakSecondsLeft(null);
  }

  function handleStroke(stroke) {
    socket.emit('classroom:annotate', stroke);
  }

  function clearAnnotations() {
    setClearSignal((v) => v + 1);
    socket.emit('classroom:clearAnnotations');
  }

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{t('classroom.roomCode')}</p>
          <p dir="ltr" className="font-mono text-2xl font-extrabold text-brand-600 dark:text-brand-400">
            {roomCode || '...'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{t('classroom.connectedStudents')}</p>
          <p className="font-bold text-slate-700 dark:text-slate-200">{students.length}</p>
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <select className="input" value={algorithmKey} onChange={(e) => setAlgorithmKey(e.target.value)}>
            {algorithms.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name[lang]}
              </option>
            ))}
          </select>
          <button onClick={newArray} className="btn-outline">
            🎲 {t('classroom.newArray')}
          </button>
          <button onClick={clearAnnotations} className="btn-outline">
            🧹 {t('classroom.clearDrawing')}
          </button>
        </div>

        <div className="relative">
          <SimulationVisualizer category={category} snapshot={engine.snapshot} />
          <AnnotationCanvas canDraw onStroke={handleStroke} clearSignal={clearSignal} />
        </div>
        {engine.snapshot?.message && (
          <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{engine.snapshot.message}</p>
        )}

        <div className="mt-3">
          <ControlPanel
            playing={engine.playing}
            onPlay={engine.play}
            onPause={engine.pause}
            onStepForward={engine.stepForward}
            onStepBackward={engine.stepBackward}
            onReset={engine.reset}
            index={engine.index}
            total={engine.total}
            speed={engine.speed}
            onSpeedChange={engine.setSpeed}
            isFirst={engine.isFirst}
            isLast={engine.isLast}
          />
        </div>
      </div>

      <div className="card p-4">
        <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">📊 {t('classroom.livePoll')}</h3>
        {activePoll ? (
          <div>
            <p className="mb-2 font-semibold text-slate-700 dark:text-slate-200">{activePoll.question}</p>
            {activePoll.options.map((opt, i) => {
              const total = pollVotes?.reduce((s, v) => s + v, 0) || 0;
              const percent = total ? Math.round(((pollVotes[i] || 0) / total) * 100) : 0;
              const isCorrect = activePoll.correctIndex === i;
              const names = pollDetail?.byOption?.[i] || [];
              return (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {opt} {isCorrect && '✓'}
                    </span>
                    <span>
                      {pollVotes?.[i] || 0} ({percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-brand-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  {names.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {names.map((name, ni) => (
                        <span
                          key={ni}
                          className={`rounded px-1.5 py-0.5 text-[11px] ${
                            activePoll.correctIndex === null
                              ? 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                              : isCorrect
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                          }`}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button onClick={endPoll} className="btn-secondary mt-2 text-sm">
              {t('classroom.endPoll')}
            </button>
          </div>
        ) : (
          <form onSubmit={startPoll} className="space-y-2">
            <input
              className="input"
              placeholder={t('classroom.pollQuestion')}
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            <input
              className="input"
              placeholder={t('classroom.pollOptions')}
              value={pollOptions}
              onChange={(e) => {
                setPollOptions(e.target.value);
                setCorrectOption('');
              }}
            />
            <select className="input" value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
              <option value="">{t('classroom.noCorrectAnswer')}</option>
              {parsedPollOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary text-sm">
              🚀 {t('classroom.startPoll')}
            </button>
          </form>
        )}
      </div>

      <div className="card p-4">
        <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">☕ {t('classroom.breakTimer')}</h3>
        {breakSecondsLeft !== null ? (
          <div className="text-center">
            <p dir="ltr" className="font-mono text-3xl font-extrabold text-brand-600 dark:text-brand-400">
              {String(Math.floor(breakSecondsLeft / 60)).padStart(2, '0')}:{String(breakSecondsLeft % 60).padStart(2, '0')}
            </p>
            <button onClick={endBreak} className="btn-secondary mt-2 text-sm">
              {t('classroom.endBreak')}
            </button>
          </div>
        ) : (
          <form onSubmit={startBreak} className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              className="input w-24"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">{t('breakTimer.minutes')}</span>
            <button type="submit" className="btn-primary text-sm">
              ▶ {t('classroom.startBreak')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function StudentRoom() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const socket = getSocket();
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const [sync, setSync] = useState(null);
  const [poll, setPoll] = useState(null);
  const [pollVotes, setPollVotes] = useState(null);
  const [voted, setVoted] = useState(false);
  const [myAnswer, setMyAnswer] = useState(null);
  const [myAnswerCorrect, setMyAnswerCorrect] = useState(null);
  const [pollFinal, setPollFinal] = useState(null);
  const [clearSignal, setClearSignal] = useState(0);
  const [incomingStroke, setIncomingStroke] = useState(null);
  const [closed, setClosed] = useState(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(null);
  const breakIntervalRef = useRef(null);

  const algorithm = sync ? getAlgorithm(sync.algorithmKey) : null;
  const snapshots = useMemo(() => {
    if (!algorithm || !sync) return [];
    try {
      return algorithm.run([...sync.array]);
    } catch {
      return [];
    }
  }, [algorithm, sync]);
  const snapshot = sync ? snapshots[Math.min(sync.stepIndex, snapshots.length - 1)] : null;

  useEffect(() => {
    socket.on('classroom:sync', setSync);
    socket.on('classroom:pollStart', (p) => {
      setPoll(p);
      setPollFinal(null);
      setVoted(false);
      setMyAnswer(null);
      setMyAnswerCorrect(null);
      setPollVotes(new Array(p.options.length).fill(0));
    });
    socket.on('classroom:pollUpdate', ({ votes }) => setPollVotes(votes));
    socket.on('classroom:pollEnd', (final) => {
      setPollFinal(final?.votes || null);
      setPoll(null);
    });
    socket.on('classroom:annotate', setIncomingStroke);
    socket.on('classroom:clearAnnotations', () => setClearSignal((v) => v + 1));
    socket.on('classroom:roomClosed', () => setClosed(true));
    socket.on('classroom:breakStart', ({ seconds }) => {
      setBreakSecondsLeft(seconds);
      clearInterval(breakIntervalRef.current);
      breakIntervalRef.current = setInterval(() => {
        setBreakSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(breakIntervalRef.current);
            return prev === null ? null : 0;
          }
          return prev - 1;
        });
      }, 1000);
    });
    socket.on('classroom:breakEnd', () => {
      clearInterval(breakIntervalRef.current);
      setBreakSecondsLeft(null);
    });

    return () => {
      socket.off('classroom:sync');
      socket.off('classroom:pollStart');
      socket.off('classroom:pollUpdate');
      socket.off('classroom:pollEnd');
      socket.off('classroom:annotate');
      socket.off('classroom:clearAnnotations');
      socket.off('classroom:roomClosed');
      socket.off('classroom:breakStart');
      socket.off('classroom:breakEnd');
      clearInterval(breakIntervalRef.current);
    };
  }, [socket]);

  function join(e) {
    e.preventDefault();
    setError('');
    if (!roomCodeInput.trim() || !name.trim()) return;
    socket.connect();
    socket.emit('classroom:join', { roomCode: roomCodeInput.trim().toUpperCase(), name: name.trim() }, (ack) => {
      if (ack?.error) {
        setError(t('classroom.roomNotFound'));
        socket.disconnect();
      } else {
        setJoined(true);
      }
    });
  }

  function vote(optionIndex) {
    setVoted(true);
    setMyAnswer({ index: optionIndex, text: poll?.options?.[optionIndex] });
    socket.emit('classroom:pollVote', { optionIndex }, (ack) => {
      setMyAnswerCorrect(ack?.isCorrect ?? null);
    });
  }

  if (closed) {
    return <p className="card p-6 text-center text-slate-500 dark:text-slate-400">👋 {t('classroom.roomEnded')}</p>;
  }

  if (!joined) {
    return (
      <form onSubmit={join} className="card mx-auto max-w-sm space-y-3 p-6">
        <input
          dir="ltr"
          className="input text-center font-mono text-lg"
          placeholder={t('classroom.roomCode')}
          value={roomCodeInput}
          onChange={(e) => setRoomCodeInput(e.target.value)}
        />
        <input className="input" placeholder={t('classroom.yourName')} value={name} onChange={(e) => setName(e.target.value)} />
        {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          {t('classroom.join')}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      {breakSecondsLeft !== null && (
        <div className="card overflow-hidden border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center dark:border-amber-600 dark:from-amber-900/30 dark:to-orange-900/30">
          <p className="animate-bounce text-5xl">☕</p>
          <p className="mt-2 text-lg font-extrabold text-amber-700 dark:text-amber-300">{t('classroom.breakMessage')}</p>
          <p dir="ltr" className="mt-1 font-mono text-4xl font-extrabold text-amber-600 dark:text-amber-400">
            {String(Math.floor(breakSecondsLeft / 60)).padStart(2, '0')}:{String(breakSecondsLeft % 60).padStart(2, '0')}
          </p>
        </div>
      )}

      <div className="card p-4">
        {snapshot ? (
          <>
            <div className="relative">
              <SimulationVisualizer category="sorting" snapshot={snapshot} />
              <AnnotationCanvas canDraw={false} incomingStroke={incomingStroke} clearSignal={clearSignal} />
            </div>
            {snapshot.message && <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{snapshot.message}</p>}
            <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
              {algorithm?.name[lang]} — {t('controls.step')} {sync.stepIndex + 1}
            </p>
          </>
        ) : (
          <p className="py-10 text-center text-slate-400 dark:text-slate-500">{t('classroom.waitingForHost')}</p>
        )}
      </div>

      {(poll || pollFinal) && (
        <div className="card p-4">
          <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">📊 {t('classroom.livePoll')}</h3>
          {poll && (
            <p className="mb-2 font-semibold text-slate-700 dark:text-slate-200">{poll.question}</p>
          )}
          {poll && !voted && (
            <div className="flex flex-wrap gap-2">
              {poll.options.map((opt, i) => (
                <button key={i} onClick={() => vote(i)} className="btn-outline text-sm">
                  {opt}
                </button>
              ))}
            </div>
          )}
          {voted && myAnswer && myAnswerCorrect !== null && (
            <p
              className={`mb-2 rounded-lg px-3 py-1.5 text-sm font-bold ${
                myAnswerCorrect
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
              }`}
            >
              {t('classroom.yourAnswer')}: {myAnswer.text} {myAnswerCorrect ? '✓' : '✗'}
            </p>
          )}
          {(voted || pollFinal) && (
            <div>
              {(poll?.options || []).map((opt, i) => {
                const votesArr = pollFinal || pollVotes || [];
                const total = votesArr.reduce((s, v) => s + v, 0) || 0;
                const percent = total ? Math.round(((votesArr[i] || 0) / total) * 100) : 0;
                return (
                  <div key={i} className="mb-1">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{opt}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
              {pollFinal && <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{t('classroom.pollClosed')}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Classroom() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isInstructor = user?.role === 'instructor';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="mb-4 inline-block text-sm text-brand-600 dark:text-brand-400">
        ← {t('common.back')}
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold text-slate-800 dark:text-slate-100">🏫 {t('classroom.title')}</h1>
      {isInstructor ? <InstructorRoom /> : <StudentRoom />}
    </div>
  );
}
