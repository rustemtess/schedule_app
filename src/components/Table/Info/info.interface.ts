export interface IInfo {
    timeId: number|undefined,
    setInfo: Function,
    edit: boolean,
    userId: number|undefined,
    setDate: Function,
    isListAccess?: boolean
}

export interface IUserInfo {
    name: string,
    surname: string,
    middlename: string,
    number: number,
    timeRegistered: string,
    meetId: number
}