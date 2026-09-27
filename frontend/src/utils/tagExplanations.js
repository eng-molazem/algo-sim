const EXPLANATIONS = {
  compare: {
    ar: 'الخوارزمية تقارن بين عنصرين لتقرر ترتيبهما النسبي أو ما إذا كانت الشرط متحقق، وهذه المقارنة هي الأساس الذي تُبنى عليه معظم قرارات الخوارزمية.',
    en: 'The algorithm compares two elements to decide their relative order or whether a condition holds — this comparison is the basis for most of the algorithm’s decisions.',
  },
  swap: {
    ar: 'تم تبديل مكاني عنصرين في المصفوفة لأن أحدهما لم يكن في موضعه الصحيح بحسب نتيجة المقارنة السابقة.',
    en: 'Two elements were swapped because one of them was not in its correct position based on the previous comparison.',
  },
  shift: {
    ar: 'تم إزاحة عنصر خطوة واحدة لإفساح المجال أمام العنصر الحالي ليُدرَج في موضعه الصحيح لاحقاً.',
    en: 'An element was shifted one position to make room for the current element to be inserted in its correct place later.',
  },
  insert: {
    ar: 'تم إدراج القيمة في موضعها النهائي بعد أن تأكدت الخوارزمية أن هذا هو المكان الصحيح لها.',
    en: 'The value was inserted at its final position once the algorithm confirmed this was the correct place for it.',
  },
  found: {
    ar: 'وصلت الخوارزمية إلى القيمة المطلوبة، وهذا يعني نجاح عملية البحث.',
    en: 'The algorithm reached the target value — the search succeeded.',
  },
  'not-found': {
    ar: 'انتهت الخوارزمية من فحص جميع المواضع الممكنة ولم تجد القيمة المطلوبة، لذا فهي غير موجودة في البيانات المعطاة.',
    en: 'The algorithm finished checking all possible positions without finding the target — it does not exist in the given data.',
  },
  visit: {
    ar: 'هذه العقدة تُعامَل الآن كنقطة اهتمام حالية: تُسجَّل كمزارة وتُفحص جيرانها أو أبناؤها.',
    en: 'This node is now the current point of interest: it gets marked as visited and its neighbors or children are examined.',
  },
  relax: {
    ar: '"عملية الاسترخاء" (Relaxation) تعني إيجاد مسار أقصر إلى عقدة عبر العقدة الحالية، فتُحدَّث أقصر مسافة معروفة لها.',
    en: '"Relaxation" means finding a shorter path to a node through the current node, so its best-known distance gets updated.',
  },
  enqueue: {
    ar: 'تمت إضافة عنصر إلى نهاية الطابور (Queue)، وسيُعالَج بعد كل العناصر التي سبقته (سياسة أول داخل أول خارج FIFO).',
    en: 'An element was added to the back of the queue, and will be processed after every element that came before it (FIFO).',
  },
  dequeue: {
    ar: 'تمت إزالة العنصر الموجود في مقدمة الطابور، لأنه كان أول من دخل ضمن العناصر الحالية.',
    en: 'The element at the front of the queue was removed, since it was the first to enter among the current elements.',
  },
  push: {
    ar: 'تمت إضافة عنصر إلى أعلى المكدس (Stack)، وسيكون أول عنصر يُزال لاحقاً (سياسة آخر داخل أول خارج LIFO).',
    en: 'An element was pushed onto the top of the stack, and will be the first to be removed later (LIFO).',
  },
  'push-place': {
    ar: 'تمت إضافة عنصر إلى أعلى المكدس (Stack)، وسيكون أول عنصر يُزال لاحقاً (سياسة آخر داخل أول خارج LIFO).',
    en: 'An element was pushed onto the top of the stack, and will be the first to be removed later (LIFO).',
  },
  'pop-check': {
    ar: 'الخوارزمية تنظر إلى العنصر الموجود في أعلى المكدس قبل إزالته، لأن هذا هو العنصر الوحيد المتاح للوصول إليه في أي مكدس.',
    en: 'The algorithm looks at the top element of the stack before removing it, since it is the only element directly accessible.',
  },
  traverse: {
    ar: 'الخوارزمية تتنقل عبر البنية (قائمة، شجرة، أو رسم بياني) عنصراً بعد آخر بحثاً عن موضع أو قيمة معينة.',
    en: 'The algorithm moves through the structure (list, tree, or graph) one element at a time, looking for a specific position or value.',
  },
  delete: {
    ar: 'تمت إزالة عنصر من البنية، مع تحديث الروابط أو الفهارس المجاورة لتبقى البنية متماسكة وصحيحة.',
    en: 'An element was removed from the structure, and neighboring links or indices were updated so the structure stays valid.',
  },
  duplicate: {
    ar: 'شجرة البحث الثنائية لا تسمح عادة بتكرار نفس القيمة، لذا تم تجاهل الإدراج لأن القيمة موجودة مسبقاً.',
    en: 'A binary search tree typically disallows duplicate values, so the insertion was skipped since the value already exists.',
  },
  'rotate-left': {
    ar: 'اختل توازن الشجرة نحو اليمين، فقامت خوارزمية AVL بتدوير يساري لإعادة التوازن وضمان بقاء الارتفاع O(log n).',
    en: 'The tree became right-heavy, so AVL performed a left rotation to restore balance and keep the height O(log n).',
  },
  'rotate-right': {
    ar: 'اختل توازن الشجرة نحو اليسار، فقامت خوارزمية AVL بتدوير يميني لإعادة التوازن وضمان بقاء الارتفاع O(log n).',
    en: 'The tree became left-heavy, so AVL performed a right rotation to restore balance and keep the height O(log n).',
  },
  'rotate-left-right': {
    ar: 'هذه حالة اختلال مزدوجة (يسار-يمين)، فاحتاجت الخوارزمية لتدويرين متتاليين: يساري ثم يميني لإعادة التوازن.',
    en: 'This is a double imbalance case (left-right), requiring two rotations in sequence: left then right to restore balance.',
  },
  'rotate-right-left': {
    ar: 'هذه حالة اختلال مزدوجة (يمين-يسار)، فاحتاجت الخوارزمية لتدويرين متتاليين: يميني ثم يساري لإعادة التوازن.',
    en: 'This is a double imbalance case (right-left), requiring two rotations in sequence: right then left to restore balance.',
  },
  'accept-edge': {
    ar: 'تم قبول هذا الضلع في الشجرة الممتدة الصغرى لأنه يصل بين مكونين لم يكونا متصلين من قبل، دون أن يشكّل دورة.',
    en: 'This edge was accepted into the minimum spanning tree because it connects two previously disconnected components without forming a cycle.',
  },
  'reject-edge': {
    ar: 'تم رفض هذا الضلع لأن طرفيه متصلان بالفعل عبر أضلاع أخرى، وإضافته كانت ستُشكّل دورة غير مسموح بها في شجرة الامتداد.',
    en: 'This edge was rejected because its endpoints are already connected through other edges, and adding it would create a cycle.',
  },
  'base-case': {
    ar: 'هذه هي الحالة الأساسية (Base Case) التي تُبنى عليها بقية الحلول في البرمجة الديناميكية، ولا تحتاج لحساب أي حل فرعي آخر.',
    en: 'This is the base case that the rest of the dynamic-programming solutions build upon, requiring no other sub-solution.',
  },
  match: {
    ar: 'الحرفان متطابقان، لذا تمت إضافة 1 إلى طول أطول متتابعة مشتركة محسوبة سابقاً قبل هذين الحرفين مباشرة.',
    en: 'The two characters match, so 1 was added to the LCS length that was already computed right before these two characters.',
  },
  mismatch: {
    ar: 'الحرفان مختلفان، فأخذت الخوارزمية أفضل نتيجة ممكنة من تجاهل أحد الحرفين (الأعلى أو اليسار في الجدول).',
    en: 'The characters differ, so the algorithm took the best possible result from ignoring one of them (the cell above or to the left).',
  },
  hash: {
    ar: 'تُحسب دالة التجزئة (Hash Function) لتحويل القيمة إلى فهرس ضمن جدول التجزئة، بحيث يمكن الوصول إليها لاحقاً بسرعة O(1) في المتوسط.',
    en: 'The hash function is computed to map the value to an index in the hash table, allowing average O(1) access later.',
  },
  collision: {
    ar: 'حدث تصادم (Collision): قيمتان مختلفتان حصلتا على نفس الفهرس، فاستخدمت الخوارزمية إحدى استراتيجيات معالجة التصادم لحل المشكلة.',
    en: 'A collision occurred: two different values mapped to the same index, so the algorithm used a collision-resolution strategy to handle it.',
  },
  full: {
    ar: 'جدول التجزئة أو الطابور وصل لأقصى سعته، فلم تعد هناك أماكن فارغة لاستيعاب عناصر جديدة.',
    en: 'The hash table or queue reached its maximum capacity, so there is no free slot left for new elements.',
  },
  done: {
    ar: 'اكتملت الخوارزمية بنجاح ووصلت إلى نتيجتها النهائية بعد تنفيذ جميع الخطوات اللازمة.',
    en: 'The algorithm completed successfully and reached its final result after executing all necessary steps.',
  },
  start: {
    ar: 'هذه نقطة انطلاق الخوارزمية، حيث يتم تهيئة البيانات والمتغيرات قبل البدء بالخطوات الفعلية.',
    en: 'This is the algorithm’s starting point, where data and variables are initialized before the actual steps begin.',
  },
};

const DEFAULT_AR = 'لا يوجد شرح إضافي مخصص لهذه الخطوة بعد، لكن يمكنك متابعة الرسالة أعلاه والكود المقابل لفهم ما يحدث بالتفصيل.';
const DEFAULT_EN = 'No extra explanation is available for this step yet — follow the message above and the matching code to understand what is happening.';

export function getTagExplanation(tag, lang = 'ar') {
  const entry = EXPLANATIONS[tag];
  if (!entry) return lang === 'ar' ? DEFAULT_AR : DEFAULT_EN;
  return entry[lang] || entry.ar;
}
