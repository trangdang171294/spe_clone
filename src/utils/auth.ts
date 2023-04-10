import { User } from 'src/types/user.type';

export const LocalStorageEventTarget = new EventTarget();

export const saveAccessTokenToLocalStorage = (access_token: string) => {
    localStorage.setItem('access_token', access_token);
};

export const clearAccessTokenFromLS = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    const clearLSEvent = new Event('clearAccessTokenFromLS');
    LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const getProfile = () => {
    const result = localStorage.getItem('profile');
    return result ? JSON.parse(result) : null;
};

export const setProfileLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile));
};
