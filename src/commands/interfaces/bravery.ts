// Unused at the moment
interface request {
    map: number
    level: number
    roles: number[]
    language: string
    champions: number[]
}

export interface Resp {
    status: string
    data: Data
}

interface Data {
    id: any
    seedId: number
    creationTime: string
    version: string
    title: string
    champion: Champion
    items: Items
    summonerSpells: SummonerSpells
    runes: Runes
    totalCost: number
    role: string
    roleSpecificItem: any
    itemSet: ItemSet
}

interface Champion {
    name: string
    image: string
    spell: Spell
    key: string
}

interface Spell {
    image: string
    key: string
    name: string
}

interface Items {
    item1: string
    item2: string
    item3: string
    item4: string
    item5: string
    item6: string
}

interface SummonerSpells {
    sum1: string
    sum2: string
}

interface Runes {
    primary: PrimaryTree
    primaryStyle: string
    secondary: Secondary
    secondaryStyle: string
    stats: Stat[]
}

interface PrimaryTree {
    prim1: string
    prim2: string
    prim3: string
    prim4: string
}

interface Secondary {
    sec1: string
    sec2: string
}

interface Stat {
    image: string
    description: string
}

interface ItemSet {
    title: string
    associatedMaps: number[]
    associatedChampions: number[]
    priority: any
    sortRank: any
    blocks: Block[]
}

interface Block {
    type: string
    recMath: any
    minSummonerLevel: any
    maxSummonerLevel: any
    showIfSummonerSpell: any
    hideIfSummonerSpell: any
    items: Item[]
}

interface Item {
    id: string
    count: number
}
