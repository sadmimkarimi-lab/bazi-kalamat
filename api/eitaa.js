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

// Game logic for handling word-based games
const levels = [
  { base: "هوش", answers: ["شو", "هوش"], needed: 2 },
  { base: "محتوا", answers: ["تاو", "محتوا"], needed: 2 },
  { base: "مهربانی", answers: ["بار", "نام"], needed: 2 },
  { base: "دوستانه", answers: ["دوست", "نود"], needed: 2 },
  { base: "صداقت", answers: ["صد", "دقت"], needed: 2 },
  // add more levels as needed
];

let currentLevelIndex = 0;
let foundWords = [];

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    await sendMessage(
      chatId,
      "سلام! من طاویتا هستم، بیا با هم بازی کلمات رو شروع کنیم."
    );
    await sendMessage(chatId, `مرحله 1: ${levels[currentLevelIndex].base}`);
  } else {
    await checkWord(chatId, text);
  }
}

async function checkWord(chatId, word) {
  const level = levels[currentLevelIndex];
  let w = normalizeWord(word);

  if (w.length < 2) {
    await sendMessage(chatId, "کلمه خیلی کوتاه است.");
    return;
  }

  if (!canBuildFromBase(level.base, w)) {
    await sendMessage(chatId, "این کلمه را نمی‌توان با حروف کلمه اصلی ساخت.");
    return;
  }

  if (!level.answers.includes(w)) {
    await sendMessage(chatId, "این کلمه جزو جواب‌های این مرحله نیست.");
    return;
  }

  if (foundWords.includes(w)) {
    await sendMessage(chatId, "این کلمه را قبلاً وارد کرده‌ای.");
    return;
  }

  foundWords.push(w);
  await sendMessage(chatId, `کلمه جدید ثبت شد: ${w}`);
  
  if (foundWords.length >= level.needed) {
    await sendMessage(chatId, "عالی! به مرحله بعد میریم.");
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
      await sendMessage(chatId, `مرحله بعد: ${levels[currentLevelIndex].base}`);
    } else {
      await sendMessage(chatId, "تمام مراحل تمام شد! تبریک میگم!");
    }
  }
}

function normalizeWord(w) {
  return w.replace(/\s+/g, "").trim();
}

function canBuildFromBase(base, word) {
  const baseArr = base.split("");
  const wordArr = word.split("");
  const baseCount = {};
  const wordCount = {};

  baseArr.forEach((ch) => (baseCount[ch] = (baseCount[ch] || 0) + 1));
  wordArr.forEach((ch) => (wordCount[ch] = (wordCount[ch] || 0) + 1));

  for (const ch in wordCount) {
    if (!baseCount[ch] || wordCount[ch] > baseCount[ch]) return false;
  }
  return true;
}

export { sendMessage, handleMessage };
