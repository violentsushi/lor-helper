<script lang="ts">
    import type { PageProps } from "./$types";
    import {transformDescription} from '$lib/utils'
	import type { Relics } from "$lib/types";

    const { data }: PageProps = $props();

    const powers = data.powers.sort((a, b) => a.name.localeCompare(b.name))
    const relics = data.relics.sort((a, b) => a.name.localeCompare(b.name))
    const items = data.items.sort((a, b) => a.name.localeCompare(b.name))
    const keywords = data.globals.keywords.filter(item => item.description.trim() && item.name !== 'Missing Translation').sort((a, b) => a.name.localeCompare(b.name))
    const vocabTerms = data.globals.vocabTerms.sort((a, b) => a.name.localeCompare(b.name))
    
    const renderRelics = (relics: Relics) => {
        let html = "";

        for (const relic of relics) {
            html += 
                `<div class="bg-gray-600 m-1 rounded p-1" id="${relic.relicCode}">
                    <img src="${relic.assetFullAbsolutePath}" alt="${relic.name}" width="400"/>
                    <h3 class="font-bold"><a href="${relic.relicCode}">${relic.name}</a></h3>
                    <div class="flex items-center"><img src="https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${relic.rarityRef}_icon.png/100px-LoR_${relic.rarityRef}_icon.png" alt="${relic.rarity}" width="16" class="mr-1" />${relic.rarity}</div>
                    <div><span>${transformDescription(relic.description, relic.name)}</span></div>
                </div>`
        }

        return (html)
    }
</script>

<div id="contents">
    <h2 class="font-bold">Contents</h2>
    <p><a href="#powers">Powers</a></p>
    <p><a href="#relics">Relics</a></p>
    <p><a href="#items">Items</a></p>
    <p><a href="#keywords">Keywords</a></p>
    <p><a href="#vocabs">Vocab Terms</a></p>
</div>

<div id="powers">
    <h2 class="font-bold">Powers</h2>
    <div class="grid md:grid-cols-3">
        {#each powers as power}
        <div class="bg-gray-600 m-1 rounded p-1" id={power.powerCode}>
            <img src={power.assetFullAbsolutePath} alt={power.name} width="400" />
            <h3 class="font-bold"><a href={`#${power.powerCode}`}>{power.name}</a></h3>
            <div class="flex items-center"><img src={`https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${power.rarityRef}_icon.png/100px-LoR_${power.rarityRef}_icon.png`} alt={power.rarity} width="16" class="mr-1" />{power.rarity}</div>
            <div><span>{@html transformDescription(power.description, power.name)}</span></div>
        </div>
        {/each}
    </div>
</div>

<div id="relics">
    <h2 class="font-bold">Relics</h2>
    <div class="grid md:grid-cols-3">
        {@html renderRelics(relics.filter(item => item.rarity === 'EPIC'))}
        {@html renderRelics(relics.filter(item => item.rarity === 'RARE'))}
        {@html renderRelics(relics.filter(item => item.rarity === 'COMMON'))}
    </div>
</div>

<div id="items">
    <h2 class="font-bold">Items</h2>
    <div class="grid md:grid-cols-3">
        {#each items as item}
        <div class="bg-gray-600 m-1 rounded p-1" id={item.itemCode}>
            <img src={item.assetFullAbsolutePath} alt={item.name} width="400"/>
            <h3 class="font-bold"><a href={`#${item.itemCode}`}>{item.name}</a></h3>
            <div class="flex items-center"><img src={`https://wiki.leagueoflegends.com/en-us/images/thumb/LoR_${item.rarityRef}_icon.png/100px-LoR_${item.rarityRef}_icon.png`} alt={item.rarity} width="16" class="mr-1" />{item.rarity}</div>
            <div><span>{@html transformDescription(item.description, item.name)}</span></div>
        </div>
        {/each}
    </div>
</div>

<div id="keywords">
    <h2 class="font-bold">Keywords</h2>
    {#each keywords as keyword}
    <div class="bg-gray-600 m-1 rounded p-1 text-white" id={`keyword.${keyword.nameRef.toLowerCase()}`}>
        <h3 class="font-bold">{keyword.name}</h3>
        <p>{keyword.description}</p>
    </div>
    {/each}
</div>

<div id="vocabs">
    <h2 class="font-bold">Vocab Terms</h2>
    {#each vocabTerms as vocabTerm}
    <div class="bg-gray-600 m-1 rounded p-1 text-white" id={`vocab.${vocabTerm.nameRef.toLowerCase()}`}>
        <h3 class="font-bold">{vocabTerm.name}</h3>
        <p>{vocabTerm.description}</p>
    </div>
    {/each}
</div>