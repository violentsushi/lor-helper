<script lang="ts">
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();

    const champions = data.champions.sort((a, b) => a.name.localeCompare(b.name));
</script>

<p>Data taken from <a href="https://njb.fyi/poc" target="_blank">https://njb.fyi/poc</a></p>

<div id="champions">
    <h2 class="font-bold">Champions</h2>
    <div class="grid md:grid-cols-4">
        {#each champions as champion}
            <p><a href={`#${champion.name}`}>{champion.name}</a></p>
        {/each}
    </div>
</div>

{#each champions as champion}
    <div class="bg-gray-300 m-1 rounded p-1" id={champion.name}>
        <div style="width: 200px;">
            <a href={`https://wiki.leagueoflegends.com/en-us/LoR:${champion.name.replaceAll(' ', '_')}#The_Path_of_Champions`} target="_blank">
                <img src={champion.cards[0].assets[0].gameAbsolutePath} alt={`${champion.cards[0].name} card`} width="200" />
            </a>
        </div>
        <!-- {#each champion.cards as card}
            <img src={card.assets[0].gameAbsolutePath} alt={`${card.name} card`} width="200" />
        {/each} -->

        <div class="m-2">
            <h3 class="font-bold"><a href={`#${champion.name}`} class="mr-1">{champion.name}</a></h3>
    
            <p>{champion.shortSummary}</p>

            <div class="grid md:grid-cols-3">
                <p><span class="font-bold">Playstyle</span>: {champion.playstyle}</p>
                <p><span class="font-bold">Difficulty</span>: {champion.difficulty}</p>
                <p><span class="font-bold">Speed</span>: {champion.speed}</p>
            </div>
        </div>

        <fieldset class="grid md:grid-cols-3 border-1 m-1 rounded p-1">
            <legend class="font-bold">Star Powers</legend>
            <div>{@html champion.starPower1}</div>
            <div>{@html champion.starPower2}</div>
            <div>{@html champion.starPower3}</div>
            <div>{@html champion.starPower4}</div>
            <div>{@html champion.starPower5}</div>
            <div>{@html champion.starPower6}</div>
        </fieldset>

        <div class="grid md:grid-cols-4 border-1 m-1 rounded p-1">
            <div class="md:border-b-0 border-b-1">
                <p class="font-bold underline">Best Supporting Champions</p>
                {@html champion.bestSupportingChampions}
            </div>

            <div class="md:border-b-0 border-b-1">
                <p class="font-bold underline">Best Passive Powers</p>
                {@html champion.bestPassivePowers}
            </div>

            <div class="md:border-b-0 border-b-1">
                <p class="font-bold underline">Best Relics</p>
                {@html champion.bestRelics}
            </div>

            <div class="md:border-b-0">
                <p class="font-bold underline">Best Items</p>
                {@html champion.bestItems}
            </div>
        </div>

        {#if champion.generalThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">General thoughts</legend>
                {@html champion.generalThoughts}
            </fieldset>
        {/if}
        {#if champion.bestSupportingChampionsThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Best Supporting Champions thoughts</legend>
                {@html champion.bestSupportingChampionsThoughts}
            </fieldset>
        {/if}
        {#if champion.bestPassivePowersThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Best Passive Powers thoughts</legend>
                {@html champion.bestPassivePowersThoughts}
            </fieldset>
        {/if}
        {#if champion.bestRelicsThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Best Relics thoughts</legend>
                {@html champion.bestRelicsThoughts}
            </fieldset>
        {/if}
        {#if champion.bestItemsThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Best Items thoughts</legend>
                {@html champion.bestItemsThoughts}
            </fieldset>
        {/if}
        {#if champion.bestChampionPassivesThoughts}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Best Champion Passives thoughts</legend>
                {@html champion.bestChampionPassivesThoughts}
            </fieldset>
        {/if}
        {#if champion.deckEvaluation}
            <fieldset class="border-1 m-1 rounded p-1">
                <legend class="font-bold">Deck evaluation</legend>
                {@html champion.deckEvaluation}
            </fieldset>
        {/if}
    </div>
{/each}