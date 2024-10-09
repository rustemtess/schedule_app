import { IUser } from "../../pages/users/interface";
import { ReactNode } from "react";

export interface IMenu {
    id: number,
    data?: IUser
}

export interface IMenuItem {
    id: number,
    name: string,
    href: string,
    svg: ReactNode,
    permission: number
}