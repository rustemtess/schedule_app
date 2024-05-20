import { API_URL } from "."
import { IObject } from "../../components/Table/interfaces"
import { IRGB } from "../Date/interfaces";

export const getList = async (): Promise<Array<IObject>> => {
    try {
        const response = await fetch(API_URL + 'date/getlist')
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}

export const getColors = async (): Promise<Array<IRGB>> => {
    try {
        const response = await fetch(API_URL + 'date/color/getlist')
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}