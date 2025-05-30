export const transformDescription = (description: string, name?: string) => 
    description.replaceAll(/<link=keyword.([A-Za-z ]+)><sprite name=(\w+)>([A-Za-z0-9<>=/ ]+)<\/link>/g, (_substring, _keyword: string, iconName: string, text: string) =>
        `<span><sprite name=${iconName}>${text}</span>`
    ).replaceAll(/<style=(\w+)>([A-Za-z0-9:' ]+)<\/style>/g, (_substring, style: string, text: string) => {
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

        if (style === "AssociatedCard") {
            return `<a href="https://wiki.leagueoflegends.com/en-us/LoR:${text.replaceAll(" ", "_")}" class="${style.toLowerCase()}" target="_blank">${text}</a>`
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
