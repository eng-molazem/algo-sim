# متطلبات التشغيل (Runtime Requirements)

## البيئة (Environment)

- Node.js 18+ وnpm.
- MongoDB (محلي أو سحابي)، عبر متغيّر البيئة `MONGO_URI`.
- متغيّر منفصل `MONGO_URI_TEST` لقاعدة بيانات مستقلة تُستخدم فقط أثناء تشغيل اختبارات الخادم (يتم إفراغها قبل كل تشغيل عبر `dropDatabase()`).

## متغيرات بيئة الخادم (`backend/.env`)

| المتغيّر | الوصف | القيمة الافتراضية |
|---|---|---|
| `PORT` | منفذ خادم HTTP وSocket.io (يعملان على نفس المنفذ) | `5000` |
| `MONGO_URI` | رابط اتصال MongoDB | `mongodb://127.0.0.1:27017/algo_simulator` |
| `MONGO_URI_TEST` | رابط قاعدة بيانات منفصلة للاختبارات الآلية | — |
| `JWT_SECRET` | مفتاح توقيع رموز الدخول | يجب تغييره في الإنتاج |
| `JWT_EXPIRES_IN` | مدة صلاحية الرمز | `7d` |
| `CLIENT_ORIGIN` | أصل CORS المسموح للواجهة الأمامية | `http://localhost:5173` |

## متغيرات بيئة الواجهة الأمامية (`frontend/.env`)

| المتغيّر | الوصف | القيمة الافتراضية |
|---|---|---|
| `VITE_API_URL` | عنوان واجهة REST API الخاصة بالخادم | `http://localhost:5000/api` |

## التشغيل والاختبار

```bash
# الخادم
cd backend && npm install && npm run dev     # http://localhost:5000
cd backend && npm test                        # 54 اختباراً (Jest + Supertest)

# الواجهة الأمامية
cd frontend && npm install && npm run dev     # http://localhost:5173
cd frontend && npx vitest run                 # 170 اختباراً (Vitest)
cd frontend && npm run build                  # نسخة إنتاج
```

## ملاحظات

- الغرفة الصفية الحية تعمل عبر Socket.io على نفس منفذ خادم HTTP، دون الحاجة لمنفذ أو خدمة منفصلة.
- لتشغيل نسخة معزولة على منافذ مختلفة (مثلاً عند وجود مشروع آخر يشغل المنافذ الافتراضية)، يمكن تجاوز المتغيرات مباشرة عند التشغيل:

```bash
PORT=5900 CLIENT_ORIGIN=http://localhost:5901 npm run dev        # داخل backend/
VITE_API_URL=http://localhost:5900/api npx vite --port 5901      # داخل frontend/
```
