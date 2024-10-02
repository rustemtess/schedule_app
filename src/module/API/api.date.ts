import { API_URL } from "."
import { IObject } from "../../components/Table/interfaces"
import { IRGB } from "../Date/interfaces";
import { getSessionAccessToken } from "../Session";

export const getList = async (): Promise<Array<IObject>> => {
    const form = new FormData();
    form.append('access_token', getSessionAccessToken());
    try {
        const response = await fetch(API_URL + 'date/getlist', {
            method: 'POST',
            body: form
        })
        if(response.status === 200) return await response.json();
        else document.location.href = '/';
        return [];
    }catch {
        return [];
    }
}

export const getColors = async (): Promise<Array<IRGB>> => {
    const form = new FormData();
    form.append('access_token', getSessionAccessToken());
    try {
        const response = await fetch(API_URL + 'date/color/getlist', {
            method: 'POST',
            body: form
        })
        if(response.status === 200) return await response.json();
        else document.location.href = '/';
        return [];
    }catch {
        return [];
    }
}