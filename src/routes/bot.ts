import { env } from "$env/dynamic/private";
import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not set");
}

export const bot = new TelegramBot(BOT_TOKEN);

console.log("bot", BOT_TOKEN);

export const history: any[] = [];

bot.on("message", async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, msg.text + ", and?");
        history.push({ when: new Date(), msg });
    } catch (e) {
        console.error(e);
    }
});
