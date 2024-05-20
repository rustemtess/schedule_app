export interface IUser {
    id: number,
    name: string,
    surname: string,
    middlename: string,
    email: string,
    number: string,
    permissionId: number,
    permissionName: string
}

export interface IPermission {
    id: number,
    name: string
}