import { API_URL } from "."

export const getUsers = async () => {
    try {
        const response = await fetch(API_URL + 'users/getlist', {
            method: 'POST',
        })
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}