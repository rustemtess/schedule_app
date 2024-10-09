export function getSessionAccessToken(): string {
    let access_token = localStorage.getItem('access_token');
    return (!access_token) 
        ? '' 
        : access_token;  
}