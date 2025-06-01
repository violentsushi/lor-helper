import type { Globals, Items, Powers, Relics, Card } from "./types";
import sets from '$lib/data/sets.json'
import { XMLParser } from "fast-xml-parser";

export const transformDescription = (description: string, name?: string) => 
    description.replaceAll(/<style=(\w+)>([A-Za-z0-9:' ]+)<\/style>/g, (_substring, style: string, text: string) => {
        if (text === 'CardRef') {
            style = 'AssociatedCard'
            switch(name) {
                case "Absolution":
                    text = "Warlord's Hoard";
                    break;
                case "The Time Keeper":
                    text = "The Vault";
                    break;
                default:
                    break;
            }
        }

        let card = text;
        switch (text) {
            case "Coastal Defenders":
                card = "Coastal Defender"
                break;
            case "Citybreakers":
                card = "Citybreaker"
                break;
            case "Poison Puffcaps":
                card = "Poison Puffcap"
                break;
            case "Funsmiths":
                card = "Funsmith"
                break;
            case "Time Bombs":
                card = "Time Bomb"
                break;
            case "Chimes":
                card = "Chime"
                break;
            case "Decimates":
                card = "Decimate"
                break;
            case "Powder Kegs":
                card = "Powder Keg"
                break;
            case "Ghastly Bands":
                card = "Ghastly Band"
                break;
            case "Spiderlings":
                card = "Spiderling"
                break;
            case "Arachnoid Horrors":
                card = "Arachnoid Horror"
                break;
            case "Nightmares":
                card = "Nightmare"
                break;
            case "Vanguard Lookouts":
                card = "Vanguard Lookout (Card)"
                break;
            case "Deaths From Below":
                card = "Death From Below"
                break;
            case "Warning Shots":
                card = "Warning Shot"
                break;
            case "Flashbomb Traps":
                card = "Flashbomb Trap"
                break;
            case "Hex Core Upgrades":
                card = "Hex Core Upgrade"
                break;
            default:
                break;
        }

        if (style === "AssociatedCard") {
            return `<a href="https://wiki.leagueoflegends.com/en-us/LoR:${card.replaceAll(" ", "_")}" class="${style.toLowerCase()}" target="_blank">${text}</a>`
        }
        
        return `<span class="${style.toLowerCase()}">${text}</span>`
    }).replaceAll(/<color=([A-Za-z0-9#]+)>([A-Za-z0-9:' ]+)<\/color>/g, (_substring, _color: string, text: string) =>
        `<span class="keyword">${text}</span>`
    ).replaceAll(/<sprite name=(\w+)>/g, (_substring, iconName:string) => {
        let src = `https://wiki.leagueoflegends.com/en-us/images`

        // fix name
        switch(iconName) {
            case "SkillMark":
                iconName = "Skill";
                break;
            case "Lurker":
                iconName = "Lurk";
                break;
            case "LastBreath":
                iconName = "Last_Breath";
                break;
            case "SpellShield":
                iconName = "Spellshield";
                break;
            case "ElementalSkill":
                iconName = "Elemental_Skill";
                break;
            case "QuickStrike":
                iconName = "QuickAttack"
                break;
            case "Reckless":
                iconName = "Can't_Block"
                break;
            case "BlockElusive":
                iconName = "Sharpsight"
                break;
            case "Immobile":
                iconName = "Can't_Attack"
                break;
            default:
                break;
        }

        switch(iconName) {
            case "Last_Breath":
                src += `/Keyword_${iconName}.svg`;
                break;
            case "Elemental_Skill":
                src += `/thumb/Keyword_${iconName}.png/100px-Keyword_${iconName}.png`
                break;
            default:
                src += `/thumb/Keyword_${iconName}_HD.png/100px-Keyword_${iconName}_HD.png`
                break;
        }

        return `<image src="${src}" alt="${iconName} icon" width="16" class="mr-1 inline-block mb-1" />`
    })

export const transformCell = (cell?: string) => {
    if (!cell) {
        return "";
    }

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        trimValues: false
    });

    const doc = parser.parse(cell)

    let span = `<span style="white-space: pre-line;">`
    if (!doc.r) {
        span += doc.t
    }
    else {
        for (const rItem of doc.r) {
            let style = "";
    
            if (!rItem.rPr) {
                style += "font-weight: bold;";
            }

            const rgb: string | undefined = rItem.rPr?.color?.['@_rgb']
            if (rgb) {
                style += `color: #${rgb.substring(2, 8)};`;
            }
    
            const bold = rItem.rPr?.b
            if (bold !== undefined && bold['@_val'] !== "0") {
                style += "font-weight: bold;";
            }

            const italic = rItem.rPr?.i
            if (italic !== undefined && italic['@_val'] !== "0") {
                style += "font-style: italic;"
            }
            
            span += `<span style="${style}">`
            if (rItem.t['#text']) {
                span += rItem.t['#text']
            }
            else {
                span += rItem.t;
            }
            span += '</span>'
        }
    }
    span += "</span>"

    return span;
}

export const downloadDataDragon = async (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) => {
    const globalsPromise: Promise<Globals> = fetch('https://raw.githubusercontent.com/InFinity54/LoR_DDragon/refs/heads/master/core/data/globals-en_us.json').then(response => response.json());
    const itemsPromise: Promise<Items> = fetch('https://raw.githubusercontent.com/InFinity54/LoR_DDragon_Adventure/refs/heads/master/data/items-en_us.json').then(response => response.json());
    const powersPromise: Promise<Powers> = fetch('https://raw.githubusercontent.com/InFinity54/LoR_DDragon_Adventure/refs/heads/master/data/powers-en_us.json').then(response => response.json());
    const relicsPromise: Promise<Relics> = fetch('https://raw.githubusercontent.com/InFinity54/LoR_DDragon_Adventure/refs/heads/master/data/relics-en_us.json').then(response => response.json());
    const cardsArrayPromise:Promise<Card[]>[] = sets.map(item => fetch(`https://raw.githubusercontent.com/InFinity54/LoR_DDragon_${item}/refs/heads/master/data/${item}-en_us.json`).then(response => response.json()))

    const [globals, items, powers, relics, ...cardsArray]  = await Promise.all([globalsPromise, itemsPromise, powersPromise, relicsPromise, ...cardsArrayPromise]);
    const cards = cardsArray.flat();

    return {
        globals,
        items,
        powers,
        relics,
        cards
    }
}