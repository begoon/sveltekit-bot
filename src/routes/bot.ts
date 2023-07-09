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
        await bot.sendMessage(msg.chat.id, msg.text + ", and?", {
            reply_to_message_id: msg.message_id,
            disable_notification: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "[1]", callback_data: "1" },
                        { text: "[2]", callback_data: "2" },
                        { text: "[3]", callback_data: "3" },
                        { text: "[4]", callback_data: "4" },
                    ],
                    [{ text: "ok", callback_data: "ok" }],
                ],
            },
        });
        if (msg.text === "image") {
            const image = await bot.sendPhoto(
                msg.chat.id,
                "https://i.ibb.co/SJ5STXr/640x360.jpg"
            );
            console.log(image);
        }
        history.push({ when: new Date(), msg });
    } catch (e) {
        console.error(e);
    }
});

bot.on("callback_query", async (query) => {
    try {
        await bot.answerCallbackQuery(query.id);
        const text = query.data;
        await bot.sendMessage(query.from.id, `what's up with ${text}?`);
    } catch (e) {
        console.error(e);
    }
});
