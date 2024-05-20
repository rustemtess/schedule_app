export interface IDate {
    date: number,
    dateName: string
}

export interface ITimeObject {
    id: number,
    text: string,
    time: string
    fileUrl: string | null,
    rgb: string
}

export interface IDateObject {
    date: number,
    timeObjects: ITimeObject[]
}

export interface IObject {
    time: string,
    dateObjects: IDateObject[]
}

