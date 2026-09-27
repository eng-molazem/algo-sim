const { Server } = require('socket.io');

/**
 * All classroom state lives in memory only, keyed by a short room code —
 * a live session has no need to survive a server restart, and keeping it
 * out of MongoDB avoids modeling a "class" concept the rest of the app
 * doesn't have.
 */
const rooms = new Map();

function generateRoomCode() {
  let code;
  do {
    code = Math.random().toString(36).slice(2, 7).toUpperCase();
  } while (rooms.has(code));
  return code;
}

function roomSummary(room) {
  return {
    students: [...room.students.values()].map((s) => s.name),
    poll: room.poll
      ? { question: room.poll.question, options: room.poll.options, votes: countVotes(room.poll) }
      : null,
  };
}

function countVotes(poll) {
  const counts = new Array(poll.options.length).fill(0);
  poll.votes.forEach((optionIndex) => {
    if (counts[optionIndex] !== undefined) counts[optionIndex] += 1;
  });
  return counts;
}

/** Per-student breakdown of who voted for which option — sent to the host only. */
function pollDetail(room) {
  const byOption = room.poll.options.map(() => []);
  room.poll.votes.forEach((optionIndex, socketId) => {
    const student = room.students.get(socketId);
    if (student && byOption[optionIndex]) byOption[optionIndex].push(student.name);
  });
  return { byOption, correctIndex: room.poll.correctIndex };
}

function attachClassroomSocket(httpServer, corsOrigin) {
  const io = new Server(httpServer, { cors: { origin: corsOrigin } });

  io.on('connection', (socket) => {
    socket.on('classroom:create', (_payload, ack) => {
      const roomCode = generateRoomCode();
      rooms.set(roomCode, { hostId: socket.id, students: new Map(), poll: null, annotations: [] });
      socket.join(roomCode);
      socket.data.roomCode = roomCode;
      socket.data.isHost = true;
      ack?.({ roomCode });
    });

    socket.on('classroom:join', ({ roomCode, name }, ack) => {
      const room = rooms.get(roomCode);
      if (!room) return ack?.({ error: 'ROOM_NOT_FOUND' });

      room.students.set(socket.id, { name: name || 'طالب' });
      socket.join(roomCode);
      socket.data.roomCode = roomCode;
      socket.data.isHost = false;

      io.to(room.hostId).emit('classroom:roomUpdate', roomSummary(room));
      ack?.({ success: true, summary: roomSummary(room) });
    });

    socket.on('classroom:sync', (snapshotState) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode || !socket.data.isHost) return;
      socket.to(roomCode).emit('classroom:sync', snapshotState);
    });

    socket.on('classroom:pollStart', ({ question, options, correctIndex }) => {
      const roomCode = socket.data.roomCode;
      const room = rooms.get(roomCode);
      if (!room || !socket.data.isHost) return;
      const normalizedCorrectIndex = Number.isInteger(correctIndex) && correctIndex >= 0 && correctIndex < options.length ? correctIndex : null;
      room.poll = { question, options, correctIndex: normalizedCorrectIndex, votes: new Map() };
      io.to(roomCode).emit('classroom:pollStart', { question, options });
      io.to(room.hostId).emit('classroom:pollDetail', pollDetail(room));
    });

    socket.on('classroom:pollVote', ({ optionIndex }, ack) => {
      const roomCode = socket.data.roomCode;
      const room = rooms.get(roomCode);
      if (!room || !room.poll) return;
      room.poll.votes.set(socket.id, optionIndex);
      io.to(roomCode).emit('classroom:pollUpdate', { votes: countVotes(room.poll) });
      io.to(room.hostId).emit('classroom:pollDetail', pollDetail(room));
      const isCorrect = room.poll.correctIndex === null ? null : optionIndex === room.poll.correctIndex;
      ack?.({ isCorrect });
    });

    socket.on('classroom:pollEnd', () => {
      const roomCode = socket.data.roomCode;
      const room = rooms.get(roomCode);
      if (!room || !socket.data.isHost) return;
      io.to(roomCode).emit('classroom:pollEnd', room.poll ? { votes: countVotes(room.poll) } : null);
      room.poll = null;
    });

    socket.on('classroom:breakStart', ({ seconds }) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode || !socket.data.isHost) return;
      io.to(roomCode).emit('classroom:breakStart', { seconds });
    });

    socket.on('classroom:breakEnd', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode || !socket.data.isHost) return;
      io.to(roomCode).emit('classroom:breakEnd');
    });

    socket.on('classroom:annotate', (stroke) => {
      const roomCode = socket.data.roomCode;
      if (!roomCode || !socket.data.isHost) return;
      socket.to(roomCode).emit('classroom:annotate', stroke);
    });

    socket.on('classroom:clearAnnotations', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode || !socket.data.isHost) return;
      io.to(roomCode).emit('classroom:clearAnnotations');
    });

    socket.on('disconnect', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) return;
      const room = rooms.get(roomCode);
      if (!room) return;

      if (socket.data.isHost) {
        io.to(roomCode).emit('classroom:roomClosed');
        rooms.delete(roomCode);
      } else {
        room.students.delete(socket.id);
        io.to(room.hostId).emit('classroom:roomUpdate', roomSummary(room));
      }
    });
  });

  return io;
}

module.exports = { attachClassroomSocket };
