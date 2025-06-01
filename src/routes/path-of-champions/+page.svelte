<script lang="ts">
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();

    const champions = data.champions.sort((a, b) => a.name.localeCompare(b.name));
</script>

<div id="champions">
    <h2>Champions</h2>
    {#each champions as champion}
        <p><a href={`#${champion.name}`}>{champion.name}</a></p>
    {/each}
</div>

{#each champions as champion}
    <div class="bg-gray-300 m-1 rounded p-1" id={champion.name}>
        <h3><a href={`#${champion.name}`} class="mr-1">{champion.name}</a><a href={`https://wiki.leagueoflegends.com/en-us/LoR:${champion.name.replaceAll(' ', '_')}#The_Path_of_Champions`} target="_blank">🔍</a></h3>

        <img src={champion.cards[0].assets[0].gameAbsolutePath} alt={`${champion.cards[0].name} card`} width="200" />
        <!-- {#each champion.cards as card}
            <img src={card.assets[0].gameAbsolutePath} alt={`${card.name} card`} width="200" />
        {/each} -->

        <p>{champion.shortSummary}</p>
        <p>Playstyle: {champion.playstyle}</p>
        <p>Difficulty: {champion.difficulty}</p>
        <p>Speed: {champion.speed}</p>

        <div class="grid md:grid-cols-3 my-1 border-1 m-1 rounded p-1">
            <div>{@html champion.starPower1}</div>
            <div>{@html champion.starPower2}</div>
            <div>{@html champion.starPower3}</div>
            <div>{@html champion.starPower4}</div>
            <div>{@html champion.starPower5}</div>
            <div>{@html champion.starPower6}</div>
        </div>

        <div class="grid md:grid-cols-4 my-1 border-1 m-1 rounded p-1">
            <div>
                <p class="font-bold">Best Supporting Champions</p>
                {@html champion.bestSupportingChampions}
            </div>

            <div>
                <p class="font-bold">Best Passive Powers</p>
                {@html champion.bestPassivePowers}
            </div>

            <div>
                <p class="font-bold">Best Relics</p>
                {@html champion.bestRelics}
            </div>

            {#if champion.bestItems}
                <div>
                    <p class="font-bold">Best Items</p>
                    {@html champion.bestItems}
                </div>
            {/if}
        </div>
    </div>
{/each}