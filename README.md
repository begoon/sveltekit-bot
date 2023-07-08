# Writing a Telegram bot with SvelteKit and Vercel

Let's write a Telegram bot with SvelteKit. The bot will run in Vercel,
which provides zero-configuration support for SvelteKit.

Assume we already have a Telegram bot registered. Its token is in
the BOT_TOKEN environment variable.

Our bot will use a webhook type of deployment, not polling.

The heart of the Telegram bot operating with the webhook is the POST endpoint,
receiving callbacks from the Telegram servers. After the POST endpoint
receives the request and deserializes the payload from JSON, it passes
it to the "node-telegram-bot-api" library to handle.

Our bot will be trivial only to demonstrate how to handle the requests
from Telegram in SvelteKit. It will echo back the received text messages.

After creating a project with "npm create svelte", install the Telegram
library with "node-telegram-bot-api" and add the following configuration
to "svelte.config.js":

```javascript
const config = {
        ...
        kit: {
            ...
            csrf: {
                checkOrigin: false,
            }
       }
};
```

let's create a "+server.ts" file in the "./routes" directory.

```typescript
import { bot } from "./bot";

export async function POST({ request }) {
    try {
        bot.processUpdate(await request.json());
        return new Response("", { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("", { status: 500 });
    }
}
```

The "bot.ts" file implements the echoing of incoming messages.

```typescript
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
```

That's it.

Once the code is pushed to a git repo and deployed by Vercel, for example,
on "https://sveltekit-bot.vercel.app", we need to set a webhook allowing
Telegram to deliver the updates to the bot.

It needs to be done just once:

```bash
curl -X POST https://api.telegram.org/bot$(BOT_TOKEN)/setWebhook \
    -H "Content-type: application/json" \
    -d '{"url": "https://sveltekit-bot.vercel.app"}'
```

After that, we can start chatting with the bot!

NOTE: It is important to understand that this bot deployment to Vercel
is stateless. When there is no traffic, Vercel stops the endpoint and
kicks it off again when the traffic is coming. There is no data persistence
in the bot with this implementation. In a real bot, we may use external
storage, like a database, to persist the bot's state.

The full source of the project is available at
https://github.com/begoon/sveltekit-bot/.

In the project, there is a trivial in-memory storage for messages and
a page to print them for demonstration purposes. After the inactivity period,
the deployment restarts by Vercel, and the message storage resets.
