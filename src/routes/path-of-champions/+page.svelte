<script lang="ts">
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
    console.log(data.championsWorkSheet)

    const champions = data.champions.sort((a, b) => a.name.localeCompare(b.name));
</script>

<div id="champions">
    <h2>Champions</h2>
    {#each champions as champion}
        <p><a href={`#${champion.name}`}>{champion.name}</a></p>
    {/each}
</div>

{#each champions as champion}
    <div class="bg-gray-600 m-1 rounded p-1" id={champion.name}>
        <a href={`#${champion.name}`}><h3>{champion.name}</h3></a>
        <p>{champion.short_summary}</p>
        <p>Playstyle: {champion.playstyle}</p>
        <p>Difficulty: {champion.difficulty}</p>
        {#if champion.speed}
            <p>Speed: {champion.speed}</p>            
        {/if}
    </div>
{/each}