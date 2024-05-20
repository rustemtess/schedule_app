export function getSessionAccessToken(): string {
    let access_token = sessionStorage.getItem('access_token');
    return (!access_token) ? '' : access_token;  
}