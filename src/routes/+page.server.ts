import { bot, history } from "./bot";

export async function load({ depends }) {
    const me = await bot.getWebHookInfo();
    depends("bot:refresh");
    return {
        webhook: me,
        history,
    };
}
