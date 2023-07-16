import type { RequestEvent } from "./$types";
import { bot } from "./bot";

export async function POST({ request }: RequestEvent) {
    try {
        const data = await request.json();
        console.log(data);
        bot.processUpdate(data);
        return new Response("", { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("", { status: 500 });
    }
}
