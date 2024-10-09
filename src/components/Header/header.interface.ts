import { ReactNode } from "react";

export interface IHeader {
    children?: ReactNode,
    data?: Function,
    isUpdated?: number
}