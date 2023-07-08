<script lang="ts">
    import { invalidate } from "$app/navigation";

    export let data;
    async function refresh() {
        await invalidate("bot:refresh");
    }

    const last_error_date = new Date(
        (data.webhook.last_error_date as number) * 1000
    ).toISOString();
</script>

<button on:click={refresh}>refresh</button>
<pre>
{JSON.stringify(data.webhook, null, 2)}
</pre>
{#if last_error_date}
    <p>Last error: {last_error_date}</p>
{/if}

<ul>
    {#each data.history as { when, msg }}
        <li>
            {new Date(when).toISOString()} - {JSON.stringify(msg.text)}
        </li>
    {/each}
</ul>
