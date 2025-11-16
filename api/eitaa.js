// api/eitaa.js

const BOT_TOKEN = process.env.EITAA_BOT_TOKEN;
const API_BASE = BOT_TOKEN ? `https://api.eitaa.com/bot${BOT_TOKEN}` : null;

async function sendMessage(chat_id, text) {
  if (!API_BASE) {
    console.error("EITAA_BOT_TOKEN is missing");
    return;
  }

  try {
    await fetch(`${API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text }),
    });
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

// 👇 همان ۶۰ مرحله‌ای که تو index.html استفاده کردیم
const levels = [
  // ——— ۱۵ مرحله اول: ۲ کلمه‌ای ———
  { base: "ایران", answers: ["ایران", "رای"], needed: 2 },
  { base: "ایمان", answers: ["یمن", "نام"], needed: 2 },
  { base: "شهادت", answers: ["شهد", "شهدا"], needed: 2 },
  { base: "اخلاق", answers: ["قال", "اخلاق"], needed: 2 },
  { base: "عرفان", answers: ["عرفان", "عرف"], needed: 2 },
  { base: "حکمت", answers: ["حکم", "تحکم"], needed: 2 },
  { base: "تاریخ", answers: ["خار", "تاریخ"], needed: 2 },
  { base: "مسجد", answers: ["مس", "مسجد"], needed: 2 },
  { base: "محراب", answers: ["محراب", "حرم"], needed: 2 },
  { base: "فرهنگ", answers: ["فرهنگ", "هنر"], needed: 2 },
  { base: "عدالت", answers: ["عدالت", "علت"], needed: 2 },
  { base: "دعاگو", answers: ["وداع", "دعا"], needed: 2 },
  { base: "افلاک", answers: ["کلاف", "فلک"], needed: 2 },
  { base: "اقوام", answers: ["قوم", "وام"], needed: 2 },
  { base: "اجناس", answers: ["جنس", "نساج"], needed: 2 },

  // ——— ۱۵ مرحله دوم: ۳ کلمه‌ای ———
  { base: "طهارت", answers: ["طهارت", "تار", "طاهر"], needed: 3 },
  { base: "سروان", answers: ["سرو", "سروان", "وان"], needed: 3 },
  { base: "ملکوت", answers: ["کلم", "ملکوت", "ملک"], needed: 3 },
  { base: "نوشتن", answers: ["نوشتن", "شن", "نو"], needed: 3 },
  { base: "کتابت", answers: ["کتب", "تاب", "کتاب"], needed: 3 },
  { base: "هدایت", answers: ["هدایت", "ید", "هادی"], needed: 3 },
  { base: "رفاقت", answers: ["رفاقت", "قاف", "فقر"], needed: 3 },
  { base: "صناعت", answers: ["صناعت", "صنع", "صنعت"], needed: 3 },
  { base: "کرامت", answers: ["مار", "کرامت", "کرم"], needed: 3 },
  { base: "اهمیت", answers: ["اهمیت", "همیت", "تیم"], needed: 3 },
  { base: "توانا", answers: ["وانت", "ناو", "توان"], needed: 3 },
  { base: "مبتکر", answers: ["مبتکر", "کمر", "بکر"], needed: 3 },
  { base: "متخصص", answers: ["متخصص", "ختم", "تخصص"], needed: 3 },
  { base: "پارچه", answers: ["پارچه", "هار", "پارچ"], needed: 3 },
  { base: "کتانی", answers: ["تاک", "تیک", "کتان"], needed: 3 },

  // ——— ۱۵ مرحله سوم: ۴ کلمه‌ای ———
  { base: "پیامبر", answers: ["یار", "پیر", "پیامبر", "پیام"], needed: 4 },
  { base: "دانشمند", answers: ["دانشمند", "نام", "دشمن", "دانش"], needed: 4 },
  { base: "هسته ای", answers: ["هسته ای", "اهسته", "هاست", "هسته"], needed: 4 },
  { base: "فرهنگی", answers: ["رنگ", "نهر", "گهر", "فرهنگ"], needed: 4 },
  { base: "خورشید", answers: ["خورشید", "شیر", "شور", "رشید"], needed: 4 },
  { base: "اسطوره", answers: ["اسطوره", "طاهر", "سوره", "سطر"], needed: 4 },
  { base: "توانمند", answers: ["توانمند", "نادم", "منت", "توان"], needed: 4 },
  { base: "باستان", answers: ["اسب", "باستان", "ساتن", "استان"], needed: 4 },
  { base: "قهرمان", answers: ["نامه", "قهرمان", "قرمه", "ماهر"], needed: 4 },
  { base: "منصوری", answers: ["منور", "منصور", "نور", "مصر"], needed: 4 },
  { base: "کاشانه", answers: ["کاش", "شانه", "اشک", "کاشان"], needed: 4 },
  { base: "ارزانی", answers: ["زار", "ارزان", "رزین", "ارز"], needed: 4 },
  { base: "معنویت", answers: ["معنویت", "نیت", "منو", "معنی"], needed: 4 },
  { base: "آزادگان", answers: ["زنگ", "آزادگان", "گاز", "آزاد"], needed: 4 },
  { base: "خداباور", answers: ["دور", "خداباور", "خاور", "باور"], needed: 4 },

  // ——— ۱۵ مرحله چهارم: ۶ کلمه‌ای ———
  { base: "فرمانده", answers: ["ماهر", "مانده", "فرمانده", "نرمه", "درمان", "فرمان"], needed: 6 },
  { base: "ایرانیان", answers: ["ایران", "رانا", "نان", "ایرانیان", "یاری", "ایرانی"], needed: 6 },
  { base: "پیامبران", answers: ["نامی", "مبرا", "بیم", "پیران", "پیام", "پیامبر"], needed: 6 },
  { base: "علوم قرآنی", answers: ["نور", "علوم قرآنی", "قرین", "موقر", "علم", "قرآن"], needed: 6 },
  { base: "هوش مصنوعی", answers: ["شوم", "عین", "هوش مصنوعی", "شمع", "هوش", "مصنوع"], needed: 6 },
  { base: "فرهنگستان", answers: ["فرهنگستان", "سنگر", "تاس", "سرهنگ", "هنرستان", "فرهنگ"], needed: 6 },
  { base: "تمدن سازی", answers: ["میدان", "سیما", "سانت", "زینت", "تمدن", "تمدن سازی"], needed: 6 },
  { base: "دانش پژوهی", answers: ["شیوه", "پونه", "شانه", "واهی", "پژوهش", "دانش پژوه"], needed: 6 },
  { base: "حسین خرازی", answers: ["خان", "حرا", "حسین خرازی", "سینا", "رازی", "حسینی"], needed: 6 },
  { base: "پروین اعتصامی", answers: ["تنور", "اعتصام", "پروین اعتصامی", "وانت", "تیمار", "عصمت"], needed: 6 },
  { base: "تولید محتوا", answers: ["محتویات", "تولد", "ملات", "حیات", "حامد", "تولید"], needed: 6 },
  { base: "هویت بصری", answers: ["ترب", "بصری", "صورتی", "صبر", "بصره", "هویت بصری"], needed: 6 },
  { base: "دعوتنامه", answers: ["نهاد", "دعوت", "متنوع", "ندامت", "دعوتنامه", "دعا"], needed: 6 },
  { base: "دلدادگان", answers: ["دنگ", "دال", "دلدادگان", "ندا", "لگد", "گلدان"], needed: 6 },
  { base: "کیمیای محبت", answers: ["کمیت", "کمیاب", "تباکی", "محیا", "کیمیای محبت", "کیمیا"], needed: 6 }
];

// ❗ توجه: این متغیرها الان برای همهٔ کاربرا مشترکن.
// اگر بعداً خواستی چند کاربره و تمیزش کنیم، می‌تونیم per-chat ذخیره کنیم.
let currentLevelIndex = 0;
let foundWords = [];

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = (message.text || "").trim();

  if (text === "/start") {
    currentLevelIndex = 0;
    foundWords = [];

    await sendMessage(
      chatId,
      "سلام! من طاویتا هستم 😊\nبیا با هم بازی کلمات رو شروع کنیم.\n\nهر مرحله از حروف یک کلمه، چند تا کلمهٔ جدید می‌سازیم."
    );
    await sendCurrentLevel(chatId);
    return;
  }

  if (text === "/next") {
    await goToNextLevel(chatId);
    return;
  }

  if (text === "/status") {
    await sendStatus(chatId);
    return;
  }

  // هر متن دیگه = تلاش برای ثبت کلمه
  await checkWord(chatId, text);
}

async function sendCurrentLevel(chatId) {
  if (currentLevelIndex >= levels.length) {
    await sendMessage(
      chatId,
      "همهٔ ۶۰ مرحله رو تموم کردی! 👑\nتو قهرمان بازی کلمات طاویتا شدی.\nاز صفحهٔ آخر بازی اسکرین بگیر و برای ادمین طاویتا بفرست 🎁"
    );
    return;
  }

  const levelNumber = currentLevelIndex + 1;
  const level = levels[currentLevelIndex];

  const msg =
    `مرحله ${levelNumber} از ${levels.length}\n` +
    `کلمهٔ اصلی: «${level.base}»\n` +
    `باید حداقل ${level.needed} کلمهٔ درست پیدا کنی.\n\n` +
    `تا الان: ${foundWords.length}/${level.needed} کلمه`;

  await sendMessage(chatId, msg);
}

async function sendStatus(chatId) {
  const levelNumber = currentLevelIndex + 1;
  const level = levels[currentLevelIndex];

  await sendMessage(
    chatId,
    `📊 وضعیت فعلی:\n` +
      `مرحله: ${levelNumber} از ${levels.length}\n` +
      `کلمهٔ اصلی این مرحله: «${level.base}»\n` +
      `کلمات ثبت شده: ${foundWords.length}/${level.needed}\n` +
      `برای رفتن به مرحله بعد، باید حداقل ${level.needed} کلمهٔ درست بگی.`
  );
}

async function goToNextLevel(chatId) {
  const level = levels[currentLevelIndex];
  if (foundWords.length < level.needed) {
    await sendMessage(
      chatId,
      `هنوز به حد نصاب نرسیدی 😅\nتا حالا ${foundWords.length} تا کلمه گفتی ولی این مرحله حداقل ${level.needed} تا می‌خواد.`
    );
    return;
  }

  currentLevelIndex++;
  foundWords = [];

  if (currentLevelIndex >= levels.length) {
    await sendMessage(
      chatId,
      "بسیار تبریک! 🎉\nتو همهٔ ۶۰ مرحله رو رد کردی و قهرمان بازی کلمات طاویتا شدی 👑\nاز صفحهٔ آخر بازی اسکرین بگیر و برای ادمین کانال طاویتا بفرست تا جایزه‌ات رو بگیری 🎁"
    );
    return;
  }

  const levelNumber = currentLevelIndex + 1;

  // پیام‌های مخصوص بعد از هر ۱۵ مرحله (مثل نسخه وب)
  if (levelNumber === 16) {
    await sendMessage(
      chatId,
      "تبریک! 👏\nتو الان استاد کلمات طاویتا شدی.\nادامه بده تا به «استاد بزرگ» برسی 😎"
    );
  } else if (levelNumber === 31) {
    await sendMessage(
      chatId,
      "وااای! 🏅\nتو الان استاد بزرگ کلمات طاویتا هستی.\nبرو تا استاد افسانه‌ای شدن فقط چند قدم مونده ✨"
    );
  } else if (levelNumber === 46) {
    await sendMessage(
      chatId,
      "تو الان استاد افسانه‌ای کلمات طاویتا شدی 🤯🔥\nاگر تا مرحله ۶۰ برسی، قهرمان نهایی می‌شی!"
    );
  }

  await sendCurrentLevel(chatId);
}

async function checkWord(chatId, word) {
  if (currentLevelIndex >= levels.length) {
    await sendMessage(
      chatId,
      "تو همهٔ مراحل رو تموم کردی 👑\nاگر خواستی دوباره از اول شروع کنی، دستور /start رو بفرست."
    );
    return;
  }

  const level = levels[currentLevelIndex];
  const w = normalizeWord(word);

  if (!w) {
    await sendMessage(chatId, "اول یک کلمه بنویس 😉");
    return;
  }

  if (w.length < 2) {
    await sendMessage(chatId, "این کلمه خیلی کوتاهه؛ حداقل ۲ حرفی باشه.");
    return;
  }

  if (!canBuildFromBase(level.base, w)) {
    await sendMessage(
      chatId,
      "این کلمه را نمی‌توان فقط با حروف کلمهٔ اصلی ساخت؛ یک کلمهٔ دیگه امتحان کن."
    );
    return;
  }

  const allowed = level.answers.map(normalizeWord);
  if (!allowed.includes(w)) {
    await sendMessage(
      chatId,
      "این کلمه جزو جواب‌های این مرحله نیست.\nیه چیز دیگه امتحان کن 🌱"
    );
    return;
  }

  if (foundWords.includes(w)) {
    await sendMessage(chatId, "این کلمه را قبلاً گفتی 😊");
    return;
  }

  // ✅ کلمهٔ صحیح جدید
  foundWords.push(w);
  await sendMessage(
    chatId,
    `آفرین! 🌟\nکلمهٔ جدید ثبت شد: «${w}»\n` +
      `تا الان ${foundWords.length} از ${level.needed} کلمهٔ لازم رو پیدا کردی.`
  );

  if (foundWords.length >= level.needed) {
    // حد نصاب این مرحله تکمیل شد
    if (currentLevelIndex === levels.length - 1) {
      // آخرین مرحله
      await sendMessage(
        chatId,
        "تو آخرین مرحله هم موفق شدی! 👑\nبا دستور /next پیام قهرمانی و پایان بازی رو ببین."
      );
    } else {
      await sendMessage(
        chatId,
        "عالی! 🎉\nحد نصاب این مرحله کامل شد.\nاگر آماده‌ای، دستور /next رو بفرست تا بریم مرحله بعد."
      );
    }
  }
}

function normalizeWord(w) {
  return (w || "").replace(/\s+/g, "").trim();
}

function canBuildFromBase(base, word) {
  const baseArr = base.split("");
  const wordArr = word.split("");
  const baseCount = {};
  const wordCount = {};

  baseArr.forEach((ch) => {
    baseCount[ch] = (baseCount[ch] || 0) + 1;
  });
  wordArr.forEach((ch) => {
    wordCount[ch] = (wordCount[ch] || 0) + 1;
  });

  for (const ch in wordCount) {
    if (!baseCount[ch] || wordCount[ch] > baseCount[ch]) {
      return false;
    }
  }
  return true;
}

export { sendMessage, handleMessage };
