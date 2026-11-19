# AlgoSim — Interactive Algorithm & Data Structure Learning Platform
## منصة تفاعلية لمحاكاة الخوارزميات وهياكل البيانات

**🇬🇧 [English](#-english) | 🇸🇦 [العربية](#-العربية)**

---

## 🇬🇧 English

### Overview

AlgoSim is a full-stack, real-time platform for simulating and teaching algorithms and data structures. It combines step-by-step visual simulation, real source code in 12 programming languages, an interactive coding sandbox, and a live virtual classroom system built for instructors and students.

> Full technical documentation (Arabic) is available at [`final/1/توثيق_المشروع_التقني.docx`](final/1/توثيق_المشروع_التقني.docx).

### Current Scope

- **43 algorithms and data structures** across **10 categories**: Sorting (8), Searching (5), Scheduling (6), Stack (3), Queue (2), Linked List (3), Trees (6), Graphs (5), Dynamic Programming (3), and Hashing (2).
- Full interactive step-by-step simulation for every algorithm, with real source code shown in 12 programming languages, with the active line highlighted in sync with the animation.

### Key Features

**Accounts & Permissions**
- JWT-based sign-up/login with student/instructor roles, plus an Instructor Mode that enlarges controls for classroom presentation.

**Simulation & Comparison**
- Full simulation control: play / pause / step forward & backward / reset / speed control.
- Interactive code sandbox with automatic result verification and a leaderboard for successful attempts.
- Multi-algorithm performance comparison, synchronized live simulation (visual race), and comparing the same algorithm across different inputs.
- Export a performance report as PDF, and export the simulation as an animated GIF.

**Learning & Gamification**
- "Explain more" button, next-algorithm suggestions, and a "Guess the Next Step" mini-game.
- Progress tracking with four tiered achievement badges.

**Classrooms (Sections)**
- A real classroom system: instructors create a section with a unique join code, and students join using that code.
- Assignments and quizzes are strictly tied to a section and are visible only to that section's students — full isolation between different instructors.
- The instructor dashboard and PDF section reports are scoped to that instructor's own sections only.

**Live Classroom Room (via Socket.io)**
- A live room code with synchronized simulation playback between the instructor and all connected students.
- Live polls with instant, private feedback (✓/✗) per student on their own answer, without revealing it to others.
- Live drawing/annotation on screen, and a shared break timer.

**Visual Identity**
- Light/dark mode with automatic system preference detection, full Arabic/English support (RTL/LTR), and an animated 3D background.

### Tech Stack

| Layer | Technologies |
|---|---|
| Backend | Node.js, Express, MongoDB (Mongoose), Socket.io |
| Frontend | React, Vite, Tailwind CSS |
| Testing | Jest & Supertest (backend), Vitest (frontend) |

### Project Structure

```
backend/    Node.js + Express + MongoDB (Mongoose) + Socket.io REST/Realtime API
frontend/   React + Vite + Tailwind CSS
```

### Design Patterns Used

- **Strategy** — `frontend/src/algorithms/registry.js`: every algorithm is an independent module with a unified interface (`run`, `complexity`).
- **Memento** — `frontend/src/engine/SimulationEngine.js`: precomputed state snapshots enable instant step-back/undo.
- **Observer** — the same engine via `subscribe/notify`, and the same pattern repeats for broadcasting live classroom updates over Socket.io.

### Getting Started

#### 1) Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI / JWT_SECRET if needed
npm run dev            # or: npm start
npm test                # 54 automated tests (Jest + Supertest)
```

Runs on `http://localhost:5000` by default (override with `PORT`). Requires a MongoDB instance reachable at `MONGO_URI` (defaults to `mongodb://127.0.0.1:27017/algo_simulator`), and a separate `MONGO_URI_TEST` for the test suite.

#### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL defaults to http://localhost:5000/api
npm run dev
npx vitest run          # 170 automated tests
```

Runs on `http://localhost:5173`.

### Author

**Mohammad Molazem** — [GitHub](https://github.com/eng-molazem) · [LinkedIn](https://www.linkedin.com/in/mohammad-molazem/)

---

## 🇸🇦 العربية

### نظرة عامة

AlgoSim منصة تفاعلية متكاملة (Full-stack) لمحاكاة وتعليم الخوارزميات وهياكل البيانات في الزمن الحقيقي. تجمع بين المحاكاة البصرية خطوة بخطوة، وعرض الكود المصدري الحقيقي بـ12 لغة برمجة، وصندوق برمجة تفاعلي (Sandbox)، ونظام صف دراسي افتراضي حي مصمم للمعلمين والطلاب.

> التوثيق التقني الكامل (بالعربية) متوفر في [`final/1/توثيق_المشروع_التقني.docx`](final/1/توثيق_المشروع_التقني.docx).

### نطاق المشروع الحالي

- **43 خوارزمية وبنية بيانات** موزعة على **10 فئات**: الترتيب (8)، البحث (5)، الجدولة (6)، المكدس (3)، الطابور (2)، القائمة الوصلية (3)، الأشجار (6)، الرسوم البيانية (5)، البرمجة الديناميكية (3)، والتجزئة (2).
- محاكاة تفاعلية كاملة خطوة بخطوة لكل خوارزمية، مع عرض الكود المصدري الحقيقي بـ12 لغة برمجة وتلوين السطر النشط تزامناً مع الحركة.

### المزايا الرئيسية

**الحسابات والصلاحيات**
- تسجيل حساب/دخول (JWT) بصلاحيات طالب/مدرّس، ونمط عرض صفي (Instructor Mode) يكبّر عناصر التحكم للشرح الجماعي.

**المحاكاة والمقارنة**
- تحكم كامل بالمحاكاة: تشغيل / إيقاف مؤقت / خطوة للأمام والخلف / إعادة تعيين / التحكم بالسرعة.
- صندوق تجربة كود تفاعلي (Sandbox) مع تحقق آلي من صحة النتيجة، ولوحة صدارة (Leaderboard) للمحاولات الناجحة.
- مقارنة أداء عدة خوارزميات، محاكاة حية متزامنة (سباق بصري)، ومقارنة نفس الخوارزمية بمدخلات مختلفة.
- تصدير تقرير أداء PDF، وتصدير المحاكاة كملف GIF متحرك.

**التعليم والتلعيب**
- زر "اشرح أكثر"، اقتراح الخوارزمية التالية، ولعبة "خمّن الخطوة التالية".
- تتبّع التقدّم وأربع شارات إنجاز متدرّجة.

**الصفوف الدراسية (الشُّعب)**
- نظام صفوف حقيقي: ينشئ المعلّم شعبة برمز انضمام فريد، وينضمّ الطلاب بالرمز.
- الواجبات والاختبارات القصيرة مرتبطة إلزامياً بشعبة، ولا تظهر إلا لطلاب تلك الشعبة تحديداً — عزل كامل بين معلّمين مختلفين.
- لوحة إحصائيات المعلّم وتقرير الصف بصيغة PDF محصوران بشُعب ذلك المعلّم فقط.

**الغرفة الصفية الحية (عبر Socket.io)**
- رمز غرفة حي، تشغيل محاكاة متزامن بين المعلّم وكل الطلاب المتصلين.
- استطلاعات رأي حية مع تغذية راجعة فورية وخاصة (✓/✗) لكل طالب على إجابته دون كشفها للآخرين.
- رسم/تعليق حي على الشاشة، ومؤقّت استراحة موحّد.

**الهوية البصرية**
- وضع ليلي/نهاري قابل للتبديل مع اعتماد تفضيل النظام تلقائياً، ودعم كامل للغتين عربي/إنكليزي (RTL/LTR)، وخلفية ثلاثية الأبعاد متحركة.

### البنية التقنية

| الطبقة | التقنيات |
|---|---|
| الخلفية (Backend) | Node.js, Express, MongoDB (Mongoose), Socket.io |
| الواجهة (Frontend) | React, Vite, Tailwind CSS |
| الاختبارات | Jest & Supertest (الخلفية)، Vitest (الواجهة) |

### بنية المشروع

```
backend/    Node.js + Express + MongoDB (Mongoose) + Socket.io REST/Realtime API
frontend/   React + Vite + Tailwind CSS
```

### أنماط التصميم المطبّقة

- **Strategy** — `frontend/src/algorithms/registry.js`: كل خوارزمية وحدة مستقلة موحّدة الواجهة (`run`, `complexity`).
- **Memento** — `frontend/src/engine/SimulationEngine.js`: لقطات حالة مسبقة الحساب تتيح التراجع الفوري.
- **Observer** — نفس المحرك عبر `subscribe/notify`، ويتكرر النمط نفسه في بث تحديثات الغرفة الصفية الحية عبر Socket.io.

### التشغيل محلياً

#### 1) الخلفية (Backend)

```bash
cd backend
npm install
cp .env.example .env   # ثم عدّل MONGO_URI / JWT_SECRET عند الحاجة
npm run dev            # أو: npm start
npm test                # 54 اختباراً آلياً (Jest + Supertest)
```

يعمل افتراضياً على `http://localhost:5000` (يمكن تغييره عبر `PORT`). يتطلب قاعدة بيانات MongoDB متاحة عبر `MONGO_URI` (الافتراضي `mongodb://127.0.0.1:27017/algo_simulator`)، ومتغير منفصل `MONGO_URI_TEST` لمجموعة الاختبارات.

#### 2) الواجهة (Frontend)

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL افتراضياً http://localhost:5000/api
npm run dev
npx vitest run          # 170 اختباراً آلياً
```

يعمل على `http://localhost:5173`.

### المطوّر

**محمد ملازم** — [GitHub](https://github.com/eng-molazem) · [LinkedIn](https://www.linkedin.com/in/mohammad-molazem/)
