import { downloadDataDragon, transformCell } from '$lib';
import type { PageLoad } from './$types'
import xlsx from 'xlsx'
import championAssocations from '$lib/data/path-of-champions.json'
import type { Card } from '$lib/types';

// interface SupportingChampion {
//     name: string;
//     tier: string;
//     note: boolean;
//     starPowerRequirements: number[]
// }

// interface PassivePower {
//     name: string;
//     tier: string;
//     note: boolean;
//     starPowerRequirements: number[]
//     rarity?: string;
// }

// interface Relic {
//     name: string;
//     tier: string;
//     note: boolean;
//     starPowerRequirements: number[]
//     rarity: string;
// }

// interface Item {
//     name: string;
//     tier: string;
//     note: boolean;
//     starPowerRequirements: number[]
//     rarity: string;
// }

interface Champion {
    name: string;
    shortSummary?: string;
    playstyle: string;
    difficulty: string;
    speed?: string;
    bestSupportingChampions: string;
    bestPassivePowers: string;
    bestLegendsOfArcaneReturnPowers: string;
    bestRelics: string;
    bestRunes: string;
    bestItems: string;
    starPower1: string;
    starPower2: string;
    starPower3: string;
    starPower4?: string;
    starPower5?: string;
    starPower6?: string;
    cards: Card[];
    generalThoughts?: string;
    bestSupportingChampionsThoughts?: string;
    bestPassivePowersThoughts?: string;
    bestRelicsThoughts?: string;
    bestItemsThoughts?: string;
    bestChampionPassivesThoughts?: string;
    deckEvaluation?: string;
}

export const load: PageLoad = async (event) => {
    const {cards} = await downloadDataDragon(event.fetch);

    const data = await event.fetch("https://docs.google.com/spreadsheets/d/1FePMz4o3tbiWcz0nHZYu0aAHknbIfb9anWfQCVtvtKk/export?format=xlsx&gid=1877830190").then(response => response.arrayBuffer())
    
    const workSheets = xlsx.read(data, {
        sheets: "Champions"
    })
    const championsWorkSheet = workSheets.Sheets["Champions"]

    const champions: Champion[] = [];
    const rowNumbers = new Set<string>(Object.keys(championsWorkSheet).filter(key => /[\d]+/.test(key)).map(key => key.match(/[\d]+/)![0]))
    
    for (const rowNumber of rowNumbers) {
        // skip the header row
        // skip if no star_power_1, meaning that row is not a champion
        if (rowNumber === '1' || championsWorkSheet[`N${rowNumber}`] === undefined) {
            continue;
        }

        const championName: string = championsWorkSheet[`A${rowNumber}`]?.v.trim();
        const championAssocation = championAssocations.find(item => item.name.toLowerCase() === championName.toLowerCase());
        const championCards: Card[] = [];
        const championCard = cards.find(item => item.cardCode === championAssocation?.cardCode);

        if (championCard) {
            championCards.push(championCard)
            // for (const associatedCardRef of championCard.associatedCardRefs) {
            //     const associatedCard = cards.find(item => item.cardCode === associatedCardRef);
            //     if (associatedCard) {
            //         championCards.push(associatedCard)
            //     }
            // }
        }

        champions.push({
            name: championName,
            shortSummary: championsWorkSheet[`D${rowNumber}`]?.v,
            playstyle: championsWorkSheet[`E${rowNumber}`]?.v,
            difficulty: championsWorkSheet[`F${rowNumber}`]?.v,
            speed: championsWorkSheet[`G${rowNumber}`]?.v,
            bestSupportingChampions: transformCell(championsWorkSheet[`H${rowNumber}`]?.r),
            bestPassivePowers: transformCell(championsWorkSheet[`I${rowNumber}`]?.r),
            bestLegendsOfArcaneReturnPowers: transformCell(championsWorkSheet[`J${rowNumber}`]?.r),
            bestRelics: transformCell(championsWorkSheet[`K${rowNumber}`]?.r),
            bestRunes: transformCell(championsWorkSheet[`L${rowNumber}`]?.r),
            bestItems: transformCell(championsWorkSheet[`M${rowNumber}`]?.r),
            starPower1: transformCell(championsWorkSheet[`N${rowNumber}`]?.r),
            starPower2: transformCell(championsWorkSheet[`O${rowNumber}`]?.r),
            starPower3: transformCell(championsWorkSheet[`P${rowNumber}`]?.r),
            starPower4: transformCell(championsWorkSheet[`Q${rowNumber}`]?.r),
            starPower5: transformCell(championsWorkSheet[`R${rowNumber}`]?.r),
            starPower6: transformCell(championsWorkSheet[`S${rowNumber}`]?.r),
            generalThoughts: transformCell(championsWorkSheet[`T${rowNumber}`]?.r),
            bestSupportingChampionsThoughts: transformCell(championsWorkSheet[`U${rowNumber}`]?.r),
            bestPassivePowersThoughts: transformCell(championsWorkSheet[`V${rowNumber}`]?.r),
            bestRelicsThoughts: transformCell(championsWorkSheet[`W${rowNumber}`]?.r),
            bestItemsThoughts: transformCell(championsWorkSheet[`X${rowNumber}`]?.r),
            bestChampionPassivesThoughts: transformCell(championsWorkSheet[`Y${rowNumber}`]?.r),
            deckEvaluation: transformCell(championsWorkSheet[`Z${rowNumber}`]?.r),
            cards: championCards
        })
    }

    return {
        champions,
        championsWorkSheet
    }
};