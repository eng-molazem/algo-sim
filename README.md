# منصة تفاعلية لمحاكاة الخوارزميات وهياكل البيانات
### Interactive Platform for Simulating Algorithms and Data Structures

راجع [`final/1/توثيق_المشروع_التقني.docx`](final/1/توثيق_المشروع_التقني.docx) للتوثيق التقني الكامل والمفصّل.

## البنية (Structure)

```
backend/    Node.js + Express + MongoDB (Mongoose) + Socket.io REST/Realtime API
frontend/   React + Vite + Tailwind CSS
```

## التشغيل محلياً (Local Setup)

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI / JWT_SECRET if needed
npm run dev            # or: npm start
npm test                # 54 automated tests (Jest + Supertest)
```

Runs on `http://localhost:5000` by default (override with `PORT`). Requires a MongoDB instance reachable at `MONGO_URI` (defaults to `mongodb://127.0.0.1:27017/algo_simulator`), and a separate `MONGO_URI_TEST` for the test suite.

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL defaults to http://localhost:5000/api
npm run dev
npx vitest run          # 170 automated tests
```

Runs on `http://localhost:5173`.

## نطاق المشروع الحالي (Current Scope)

- **43 خوارزمية وبنية بيانات** موزعة على **10 فئات**: الترتيب (8)، البحث (5)، الجدولة (6)، المكدس (3)، الطابور (2)، القائمة الوصلية (3)، الأشجار (6)، الرسوم البيانية (5)، البرمجة الديناميكية (3)، والتجزئة (2).
- محاكاة تفاعلية كاملة خطوة بخطوة لكل خوارزمية، مع عرض الكود المصدري الحقيقي بـ12 لغة برمجة وتلوين السطر النشط تزامناً مع الحركة.

## المزايا الرئيسية (Key Features)

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

## أنماط التصميم المطبّقة (Design Patterns)

- **Strategy** — `frontend/src/algorithms/registry.js`: كل خوارزمية وحدة مستقلة موحّدة الواجهة (`run`, `complexity`).
- **Memento** — `frontend/src/engine/SimulationEngine.js`: لقطات حالة مسبقة الحساب تتيح التراجع الفوري.
- **Observer** — نفس المحرك عبر `subscribe/notify`، ويتكرر النمط نفسه في بث تحديثات الغرفة الصفية الحية عبر Socket.io.
