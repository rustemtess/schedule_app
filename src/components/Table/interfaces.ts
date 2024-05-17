export interface IDate {
    date: number,
    dateName: string
}

export interface ITimeObject {
    id: number,
    text: string,
    time: string
    fileUrl: string | null
}

export interface IDateObject {
    date: number,
    timeObjects: ITimeObject[]
}

export interface IObject {
    time: string,
    dateObjects: IDateObject[]
}

