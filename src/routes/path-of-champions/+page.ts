import type { PageLoad } from './$types'
import * as xlsx from 'xlsx'

interface SupportingChampion {
    name: string;
    tier: string;
    note: boolean;
    star_power_requirements: number[]
}

interface PassivePower {
    name: string;
    tier: string;
    note: boolean;
    star_power_requirements: number[]
    rarity?: string;
}

interface Relic {
    name: string;
    tier: string;
    note: boolean;
    star_power_requirements: number[]
    rarity: string;
}

interface Item {
    name: string;
    tier: string;
    note: boolean;
    star_power_requirements: number[]
    rarity: string;
}

interface StarPower {
    name: string;
    description: string;
}

interface Champion {
    name: string;
    short_summary?: string;
    playstyle: string;
    difficulty: string;
    speed?: string;
    best_supporting_champions: SupportingChampion[];
    best_passive_powers: PassivePower[];
    best_relics: Relic[];
    best_items: Item[];
    // star_power_1: StarPower;
    // star_power_2: StarPower;
    // star_power_3: StarPower;
    // star_power_4?: StarPower;
    // star_power_5?: StarPower;
    // star_power_6?: StarPower;
}

export const load: PageLoad = async (event) => {
    const data = await event.fetch("/data/LOR Path of Champions.xlsx").then(response => response.arrayBuffer())
    
    const workSheets = xlsx.read(data, {
        sheets: "Champions"
    })
    const championsWorkSheet = workSheets.Sheets["Champions"]

    const champions: Champion[] = [];
    const rowNumbers = new Set<string>(Object.keys(championsWorkSheet).filter(key => /[\d]+/.test(key)).map(key => key.match(/[\d]+/)![0]))
    
    for (const rowNumber of rowNumbers) {
        // skip the header row
        // if no star_power_1, meaning a row that not a champion, then skip
        if (rowNumber === '1' || championsWorkSheet[`L${rowNumber}`] === undefined) {
            continue;
        }

        champions.push({
            name: championsWorkSheet[`A${rowNumber}`]?.v,
            short_summary: championsWorkSheet[`D${rowNumber}`]?.v,
            playstyle: championsWorkSheet[`E${rowNumber}`]?.v,
            difficulty: championsWorkSheet[`F${rowNumber}`]?.v,
            speed: championsWorkSheet[`G${rowNumber}`]?.v,
            best_supporting_champions: [],
            best_passive_powers: [],
            best_relics: [],
            best_items: [],
        })
    }

    return {
        champions,
        championsWorkSheet
    }
};