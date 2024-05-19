import { API_URL } from "."
import { IObject } from "../../components/Table/interfaces"

export const getList = async (): Promise<Array<IObject>> => {
    try {
        const response = await fetch(API_URL + 'date/getlist', {
            method: 'POST',
            body: JSON.stringify({
                'tedst': 'awdwa'
            })
        })
        if(response.status === 200) return await response.json();
        else return [];
    }catch {
        return [];
    }
}