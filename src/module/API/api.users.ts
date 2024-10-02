import { API_URL } from "."
import { getSessionAccessToken } from "../../module/Session";

export const getUsers = async (adminId: number|undefined, permissionId: number|undefined, limit: number = 10, offset: number = 0) => {
    const form = new FormData();
    form.append('admin_id', String(adminId));
    if(permissionId) form.append('isSuperAdmin', (permissionId > 3) ? '1' : '0');
    else form.append('isSuperAdmin', '0');
    form.append('limit', limit.toString());
    form.append('offset', offset.toString());
    form.append('access_token', getSessionAccessToken());
    const response = await fetch(API_URL + 'users/getlist', {
        method: 'POST',
        body: form
    });
    if(response.status === 200) 
        return await response.json();
    else return document.location.href = '/';
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
        else document.location.href = '/';
    }catch {
        return [];
    }
}

export const getPermissions = async (permissionId: number|undefined) => {
    try {
        const form = new FormData();
        form.append('access_token', getSessionAccessToken());
        if(permissionId) form.append('limit', (permissionId > 3) ? '3' : '2');
        else form.append('limit', '3');
        const response = await fetch(API_URL + 'users/permissions', {
            method: 'POST',
            body: form
        });
        if(response.status === 200) return await response.json();
        else return document.location.href = '/';
    }catch {
        return [];
    }
}