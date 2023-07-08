import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { bot } from "./bot";

export async function GET() {
    const me = env.BOT_URL;
    console.log("me", me);
    const wh = await bot.setWebHook(me!);
    console.log(wh);
    return json({ me, wh });
}

export async function POST({ request }) {
    const data = await request.json();
    console.log(data);
    bot.processUpdate(data);
    return new Response("", { status: 200 });
}
