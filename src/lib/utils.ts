// todo fix sprite, just need to get sprite image somewhere
export const transformDescription = (description: string, name?: string) => 
    description.replaceAll(/<style=(\w+)>([A-Za-z0-9:' ]+)<\/style>/g, (_substring, style: string, text: string) => {
        if (text === 'CardRef') {
            switch(name) {
                case "Absolution": text = text.replace("CardRef", "Warlord's Hoard"); 
                    break;
                case "The Time Keeper": text = text.replace("CardRef", "The Vault");
                    break;
                default:
                    break;
            }
            style = 'AssociatedCard'
        }

        return `<span class="${style.toLowerCase()}">${text}</span>`}
    ).replaceAll(/<color=([A-Za-z0-9#]+)>([A-Za-z0-9:' ]+)<\/color>/g, (_substring, _style: string, text: string) =>
        `<span class="keyword">${text}</span>`
    )
