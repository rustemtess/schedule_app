import { IUser } from "../../pages/users/interface"

export interface ITable {
    countMeetToParent: Function,
    isListAccess?: boolean,
    isEdit?: boolean,
    dataList?: Array<IObject>,
    date?: Date,
    userId: number|undefined,
    isExport?: boolean,
    user?: IUser|undefined
}

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
    day: number,
    date: string,
    timeObjects: ITimeObject[]
}

export interface IObject {
    time: string,
    dateObjects: IDateObject[]
}

