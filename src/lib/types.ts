export type Globals = {
  vocabTerms: Array<{
    description: string
    name: string
    nameRef: string
  }>
  keywords: Array<{
    description: string
    name: string
    nameRef: string
  }>
  regions: Array<{
    abbreviation: string
    iconAbsolutePath: string
    name: string
    nameRef: string
  }>
  spellSpeeds: Array<{
    name: string
    nameRef: string
  }>
  rarities: Array<{
    name: string
    nameRef: string
  }>
  sets: Array<{
    iconAbsolutePath: string
    name: string
    nameRef: string
  }>
  formats: Array<{
    iconAbsolutePath?: string
    name: string
    nameRef: string
  }>
  adventureRarities: Array<{
    name: string
    nameRef: string
  }>
}

export type Items = Array<{
  assetAbsolutePath: string
  assetFullAbsolutePath: string
  description: string
  descriptionRaw: string
  name: string
  itemCode: string
  rarity: string
  rarityRef: string
}>

export type Powers = Array<{
  assetAbsolutePath: string
  assetFullAbsolutePath: string
  description: string
  descriptionRaw: string
  name: string
  powerCode: string
  rarity: string
  rarityRef: string
}>

export type Relics = Array<{
  assetAbsolutePath: string
  assetFullAbsolutePath: string
  description: string
  descriptionRaw: string
  name: string
  relicCode: string
  rarity: string
  rarityRef: string
}>

export type Card = {
  associatedCards: Array<any>
  associatedCardRefs: Array<string>
  assets: Array<{
    gameAbsolutePath: string
    fullAbsolutePath: string
  }>
  regions: Array<string>
  regionRefs: Array<string>
  attack: number
  cost: number
  health: number
  description: string
  descriptionRaw: string
  levelupDescription: string
  levelupDescriptionRaw: string
  flavorText: string
  artistName: string
  name: string
  cardCode: string
  keywords: Array<string>
  keywordRefs: Array<string>
  spellSpeed: string
  spellSpeedRef: string
  rarity: string
  rarityRef: string
  subtypes: Array<string>
  supertype: string
  type: string
  collectible: boolean
  set: string
  formats?: Array<string>
  formatRefs?: Array<string>
}