<script lang="ts">
    import type { PageProps } from "./$types";
    import {transformDescription} from '$lib/utils'

    const { data }: PageProps = $props();

    const powers = data.powers.sort((a, b) => a.name.localeCompare(b.name))
    const relics = data.relics.sort((a, b) => a.name.localeCompare(b.name))
    const items = data.items.sort((a, b) => a.name.localeCompare(b.name))
</script>

<div id="contents">
    <h2>Contents</h2>
    <p><a href="#powers">Powers</a></p>
    <p><a href="#relics">Relics</a></p>
    <p><a href="#items">Items</a></p>
</div>

<div id="powers">
    <h2>Powers</h2>
    {#each powers as power}
        <div class="bg-gray-600 m-1 rounded p-1" id={power.powerCode}>
            <img src={power.assetFullAbsolutePath} alt={power.name} width="400"/>
            <a href={`#${power.powerCode}`}><h3>{power.name}</h3></a>
            <p>{power.rarity}</p>
            <p>{@html transformDescription(power.description, power.name)}</p>
        </div>
    {/each}
</div>

<div id="relics">
    <h2>Relics</h2>
    {#each relics as relic}
        <div class="bg-gray-600 m-1 rounded p-1" id={relic.relicCode}>
            <img src={relic.assetFullAbsolutePath} alt={relic.name} width="400"/>
            <a href={`#${relic.relicCode}`}><h3>{relic.name}</h3></a>
            <p>{relic.rarity}</p>
            <p>{@html transformDescription(relic.description, relic.name)}</p>
        </div>
    {/each}
</div>

<div id="items">
    <h2>Items</h2>
    {#each items as item}
        <div class="bg-gray-600 m-1 rounded p-1" id={item.itemCode}>
            <img src={item.assetFullAbsolutePath} alt={item.name} width="400"/>
            <a href={`#${item.itemCode}`}><h3>{item.name}</h3></a>
            <p>{item.rarity}</p>
            <p>{@html transformDescription(item.description, item.name)}</p>
        </div>
    {/each}
</div>