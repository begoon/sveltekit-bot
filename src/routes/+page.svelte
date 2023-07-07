<script lang="ts">
    import { goto } from "$app/navigation";

    export let data;
    async function refresh() {
        await goto("/");
    }
</script>

<button on:click={refresh}>refresh</button>
<pre>
{JSON.stringify(data.webhook, null, 2)}
</pre>
<ul>
    {#each data.history as { when, msg }}
        <li>{new Date(when).toISOString()} - {JSON.stringify(msg.text)}</li>
    {/each}
</ul>
