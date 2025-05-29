import type { PageLoad } from './$types'
import globals from '$lib/data/globals-en_us.json'
import items from '$lib/data/items-en_us.json'
import powers from '$lib/data/powers-en_us.json'
import relics from '$lib/data/relics-en_us.json'

export const load: PageLoad = () => {
    return {
        globals,
        items,
        powers,
        relics
    }
};