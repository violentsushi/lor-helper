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
            <img src={power.assetFullAbsolutePath} alt={power.name} width="400" />
            <h3><a href={`#${power.powerCode}`} class="mr-1">{power.name}</a></h3>
            <div class="flex items-center"><img src={`https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${power.rarityRef}_icon.png/100px-LoR_${power.rarityRef}_icon.png`} alt={power.rarity} width="16" class="mr-1" />{power.rarity}</div>
            <div><span>{@html transformDescription(power.description, power.name)}</span></div>
        </div>
    {/each}
</div>

<div id="relics">
    <h2>Relics</h2>
    {#each relics as relic}
        <div class="bg-gray-600 m-1 rounded p-1" id={relic.relicCode}>
            <img src={relic.assetFullAbsolutePath} alt={relic.name} width="400"/>
            <h3><a href={`#${relic.relicCode}`} class="mr-1">{relic.name}</a></h3>
            <div class="flex items-center"><img src={`https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${relic.rarityRef}_icon.png/100px-LoR_${relic.rarityRef}_icon.png`} alt={relic.rarity} width="16" class="mr-1" />{relic.rarity}</div>
            <div><span>{@html transformDescription(relic.description, relic.name)}</span></div>
        </div>
    {/each}
</div>

<div id="items">
    <h2>Items</h2>
    {#each items as item}
        <div class="bg-gray-600 m-1 rounded p-1" id={item.itemCode}>
            <img src={item.assetFullAbsolutePath} alt={item.name} width="400"/>
            <h3><a href={`#${item.itemCode}`} class="mr-1">{item.name}</a></h3>
            <div class="flex items-center"><img src={`https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${item.rarityRef}_icon.png/100px-LoR_${item.rarityRef}_icon.png`} alt={item.rarity} width="16" class="mr-1" />{item.rarity}</div>
            <div><span>{@html transformDescription(item.description, item.name)}</span></div>
        </div>
    {/each}
</div>