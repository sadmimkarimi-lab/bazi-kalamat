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
  { base: "هوش",          answers: ["شو", "هوش"], needed: 2 },
  { base: "محتوا",        answers: ["محتوا", "اتو"], needed: 2 },
  { base: "مهربانی",      answers: ["بار", "نام"], needed: 2 },
  { base: "دوستانه",      answers: ["دوست", "نود"], needed: 2 },
  { base: "صداقت",        answers: ["صد", "دقت"], needed: 2 },
  { base: "شکوفایی",      answers: ["شیک", "کفش"], needed: 2 },
  { base: "همدلانه",      answers: ["دل", "نام"], needed: 2 },
  { base: "فروتنانه",     answers: ["تن", "نان"], needed: 2 },
  { base: "پیروزمندانه",  answers: ["پیر", "زند"], needed: 2 },
  { base: "شادمانی",      answers: ["شاد", "دانا"], needed: 2 },
  { base: "میهمان‌نوازی", answers: ["نام", "زمان"], needed: 2 },
  { base: "دلاورمردان",   answers: ["دل", "مرد"], needed: 2 },
  { base: "خوش‌بختانه",   answers: ["خوب", "شبانه"], needed: 2 },
  { base: "انسان‌دوستی",  answers: ["دست", "سود"], needed: 2 },
  { base: "طاویتا",       answers: ["ایتا", "تاو"], needed: 2 },

  // ——— ۱۵ مرحله دوم: ۳ کلمه‌ای ———
  { base: "هوش مصنوعی",   answers: ["شیوع", "موش", "صنع"], needed: 3 },
  { base: "تولید محتوا",   answers: ["تولد", "توحید", "حوا"], needed: 3 },
  { base: "مهربانی",      answers: ["بهار", "مانی", "مهر"], needed: 3 },
  { base: "دوستانه",      answers: ["دانه", "ستون", "سوته"], needed: 3 },
  { base: "صداقت",        answers: ["صدا", "قات", "تصدق"], needed: 3 },
  { base: "شکوفایی",      answers: ["کوفی", "شوک", "کشف"], needed: 3 },
  { base: "همدلانه",      answers: ["همه", "دلم", "مانه"], needed: 3 },
  { base: "فروتنانه",     answers: ["فرو", "تنور", "نفرت"], needed: 3 },
  { base: "پیروزمندانه",  answers: ["پیروز", "زنده", "مردن"], needed: 3 },
  { base: "شادمانی",      answers: ["شان", "دامن", "مانی"], needed: 3 },
  { base: "میهمان‌نوازی", answers: ["میهمان", "نوازی", "نماز"], needed: 3 },
  { base: "دلاورمردان",   answers: ["دلاور", "مردان", "درمان"], needed: 3 },
  { base: "خوش‌بختانه",   answers: ["خوشه", "بخت", "ختنه"], needed: 3 },
  { base: "انسان‌دوستی",  answers: ["انسان", "دوست", "ستون"], needed: 3 },
  { base: "طاویتا",       answers: ["طاو", "تاو", "یت"], needed: 3 },

  // ——— ۱۵ مرحله سوم: ۴ کلمه‌ای ———
  { base: "هوش مصنوعی",   answers: ["شمع", "ویژه", "نوع", "عشق"], needed: 4 },
  { base: "تولید محتوا",   answers: ["محتوا", "دوتا", "تحویل", "تولد"], needed: 4 },
  { base: "مهربانی",      answers: ["مهربان", "بها", "مهران", "نهار"], needed: 4 },
  { base: "دوستانه",      answers: ["دستان", "دوستان", "ستاده", "نواده"], needed: 4 },
  { base: "صداقت",        answers: ["صادق", "صدق", "تصدق", "قصد"], needed: 4 },
  { base: "شکوفایی",      answers: ["شکوفا", "کشویی", "فیش", "شیفو"], needed: 4 },
  { base: "همدلانه",      answers: ["همدل", "دهانه", "مهندل", "نامه"], needed: 4 },
  { base: "فروتنانه",     answers: ["فروتن", "نفرات", "تنوره", "نوا"], needed: 4 },
  { base: "پیروزمندانه",  answers: ["پیروز", "زنانه", "مردانه", "پیرامون"], needed: 4 },
  { base: "شادمانی",      answers: ["شادمان", "دانی", "نمایش", "شیدا"], needed: 4 },
  { base: "میهمان‌نوازی", answers: ["میهمانی", "میهن", "زمانی", "نمایان"], needed: 4 },
  { base: "دلاورمردان",   answers: ["دلاورمرد", "مردا", "درامد", "نامدار"], needed: 4 },
  { base: "خوش‌بختانه",   answers: ["خوشبخت", "بختانه", "ختنه", "نشت"], needed: 4 },
  { base: "انسان‌دوستی",  answers: ["دوستان", "انسانی", "داستان", "نیستان"], needed: 4 },
  { base: "طاویتا",       answers: ["ایت", "ای", "طوا", "طاو"], needed: 4 },

  // ——— ۱۵ مرحله چهارم: ۶ کلمه‌ای ———
  { base: "هوش مصنوعی",   answers: ["شوم", "صنم", "مصنوعی", "هوش مصنوعی", "هوش", "موش"], needed: 6 },
  { base: "تولید محتوا",   answers: ["تحمل", "تحمیل", "محتا", "اولویت", "تولید محتوا", "ولادت"], needed: 6 },
  { base: "مهربانی",      answers: ["مهران", "مهر", "مربا", "بهین", "مهربانی", "بیمار"], needed: 6 },
  { base: "دوستانه",      answers: ["دسته", "نود", "دوستانه", "دونه", "دوسه", "ستون"], needed: 6 },
  { base: "صداقت",        answers: ["صدق", "صداقت", "تصدق", "صادق", "قاصد", "دقت"], needed: 6 },
  { base: "شکوفایی",      answers: ["شکوفایی", "کشو", "شکاف", "کیفی", "شفا", "کشف"], needed: 6 },
  { base: "همدلانه",      answers: ["همدلانه", "همدل", "لانه", "دل", "دهان", "هلند"], needed: 6 },
  { base: "فروتنانه",     answers: ["فروتنانه", "فروت", "فروتن", "تنها", "نوار", "نفرات"], needed: 6 },
  { base: "پیروزمندانه",  answers: ["پیروزمند", "پیروزمندانه", "پیروز", "پردازنده", "رهنمود", "پیران"], needed: 6 },
  { base: "شادمانی",      answers: ["شادمانی", "نمایش", "دانش", "اشیا", "امان", "نما"], needed: 6 },
  { base: "میهمان‌نوازی", answers: ["میهمان‌نوازی", "نهان", "میهنی", "ناز", "هیزم", "زمینه"], needed: 6 },
  { base: "دلاورمردان",   answers: ["دلاورمردان", "درماند", "لار", "مردار", "دراوردن", "نامرد"], needed: 6 },
  { base: "خوش‌بختانه",   answers: ["خوش‌بختانه", "توان", "شوت", "شانه", "شنا", "خشونت"], needed: 6 },
  { base: "انسان‌دوستی",  answers: ["انسان‌دوستی", "دوستان", "نوسانات", "استوا", "داستان", "دانستنی"], needed: 6 },
  { base: "طاویتا",       answers: ["طاویتا", "طاو", "تاو", "یت", "ای", "اوات"], needed: 6 }
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
