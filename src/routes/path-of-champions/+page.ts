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
    bestRelics: string;
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
        if (rowNumber === '1' || championsWorkSheet[`L${rowNumber}`] === undefined) {
            continue;
        }

        const championName: string = championsWorkSheet[`A${rowNumber}`]?.v;
        const championAssocation = championAssocations.find(item => item.name.toLowerCase() === championName.toLowerCase());
        const championCards: Card[] = [cards.find(item => item.cardCode === championAssocation?.cardCode) as Card];
        
        for (const associatedCardRef of championCards[0].associatedCardRefs) {
            championCards.push(cards.find(item => item.cardCode === associatedCardRef) as Card)
        }

        champions.push({
            name: championName,
            shortSummary: championsWorkSheet[`D${rowNumber}`]?.v,
            playstyle: championsWorkSheet[`E${rowNumber}`]?.v,
            difficulty: championsWorkSheet[`F${rowNumber}`]?.v,
            speed: championsWorkSheet[`G${rowNumber}`]?.v,
            bestSupportingChampions: transformCell(championsWorkSheet[`H${rowNumber}`]?.r),
            bestPassivePowers: transformCell(championsWorkSheet[`I${rowNumber}`]?.r),
            bestRelics: transformCell(championsWorkSheet[`J${rowNumber}`]?.r),
            bestItems: transformCell(championsWorkSheet[`K${rowNumber}`]?.r),
            starPower1: transformCell(championsWorkSheet[`L${rowNumber}`]?.r),
            starPower2: transformCell(championsWorkSheet[`M${rowNumber}`]?.r),
            starPower3: transformCell(championsWorkSheet[`N${rowNumber}`]?.r),
            starPower4: transformCell(championsWorkSheet[`O${rowNumber}`]?.r),
            starPower5: transformCell(championsWorkSheet[`P${rowNumber}`]?.r),
            starPower6: transformCell(championsWorkSheet[`Q${rowNumber}`]?.r),
            generalThoughts: transformCell(championsWorkSheet[`R${rowNumber}`]?.r),
            bestSupportingChampionsThoughts: transformCell(championsWorkSheet[`S${rowNumber}`]?.r),
            bestPassivePowersThoughts: transformCell(championsWorkSheet[`T${rowNumber}`]?.r),
            bestRelicsThoughts: transformCell(championsWorkSheet[`U${rowNumber}`]?.r),
            bestItemsThoughts: transformCell(championsWorkSheet[`V${rowNumber}`]?.r),
            bestChampionPassivesThoughts: transformCell(championsWorkSheet[`W${rowNumber}`]?.r),
            deckEvaluation: transformCell(championsWorkSheet[`X${rowNumber}`]?.r),
            cards: championCards
        })
    }

    return {
        champions,
        championsWorkSheet
    }
};