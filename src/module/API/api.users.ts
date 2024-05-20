import { API_URL } from "."
import { getSessionAccessToken } from "../../module/Session";

export const getUsers = async () => {
    try {
        const response = await fetch(API_URL + 'users/getlist');
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}

export const getUser = async () => {
    try {
        const form = new FormData();
        form.append('access_token', getSessionAccessToken());
        const response = await fetch(API_URL + 'users/get', {
            method: 'POST',
            body: form
        });
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}

export const getPermissions = async () => {
    try {
        const response = await fetch(API_URL + 'users/permissions');
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}