export interface User {
    name: string,
    target: number,
    itemList: Item[],
    total: number,
}

type Month = {
    month: string,
    id: number,
    total: number
}

type Day = {
    date: string,
    id: number,
    total: number,
    buyList: Item[]
}

export type Item = {
    _data: {
        money: number,
        descrition: string
    }
}

export interface Statistical {
    totalMonth: Month[],
    totalDayNow: Day
}
