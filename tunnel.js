import dotenv from "dotenv";
import ngrok from "ngrok";

import TelegramBot from "node-telegram-bot-api";

dotenv.config();
console.log(process.env.BOT_TOKEN);

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not set");
}

export const bot = new TelegramBot(BOT_TOKEN);

const url = await ngrok.connect(5173);

console.log("tunnel", url);
console.log("bot", BOT_TOKEN);
console.log(await bot.setWebHook(url));
console.log(await bot.getWebHookInfo());
