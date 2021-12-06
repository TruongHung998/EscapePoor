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

type Item = {
    name: string,
    price: string,
    descrition: string
}

export interface Statistical {
    totalMonth: Month[],
    totalDayNow: Day
}
