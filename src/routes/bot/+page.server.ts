import { bot, history } from "./bot";

export async function load({}) {
    const me = await bot.getWebHookInfo();
    return {
        webhook: me,
        history,
    };
}
