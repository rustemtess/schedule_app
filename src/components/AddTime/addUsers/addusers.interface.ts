export interface IAddUsers {
    setAddUsers: Function,
    setSelectList: Function,
    list: Array<IUserList> | undefined
}

export interface IUserList {
    id: number,
    name: string,
    surname: string,
    middlename: string,
    selected: boolean
}