import { env } from "$env/dynamic/private";
import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not set");
}

export const bot = new TelegramBot(BOT_TOKEN);

console.log("bot", BOT_TOKEN);

export const history: any[] = [];

bot.on("message", (msg) => {
    history.push({
        when: new Date(),
        msg,
    });
    bot.sendMessage(msg.chat.id, msg.text + ", and?");
    if (msg.text === "glider") {
        bot.sendPhoto(
            msg.chat.id,
            "https://upload.wikimedia.org/wikipedia/commons/4/45/Glider.svg"
        );
    }
});
