import { downloadDataDragon } from '$lib';
import type { PageLoad } from './$types'

export const load: PageLoad = async (event) => {
    const data = await downloadDataDragon(event.fetch);
    
    return data;
};