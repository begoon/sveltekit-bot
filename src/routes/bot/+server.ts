import { json } from "@sveltejs/kit";
import { bot } from "./bot";

export async function GET({ url }) {
    const me = url.href.replace("http://", "https://");
    console.log("me", me);
    console.log(await bot.setWebHook(me));
    return json({ me, status: await bot.setWebHook(me) });
}

export async function POST({ request, url }) {
    const data = await request.json();
    console.log(data);
    bot.processUpdate(data);
    return new Response("", { status: 200 });
}
