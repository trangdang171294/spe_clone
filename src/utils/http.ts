import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { AuthResponse } from 'src/types/auth.type';
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLocalStorage, setProfile } from './auth';

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    constructor() {
        // viec tao them 1 bien de gan vao la de nhanh hon, doc du lieu o localstorage lau hon
        this.accessToken = getAccessTokenFromLS();
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 60 * 60 * 24, // 1 ngày
                'expire-refresh-token': 60 * 60 * 24 * 160, // 160 ngày
            },
        });
        // Add a response interceptor
        // cau hinh response tra ve

        // cauhinh header de authen

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === '/login' || url === '/register') {
                    const data = response.data as AuthResponse;
                    this.accessToken = data.data.access_token;
                    saveAccessTokenToLocalStorage(this.accessToken);
                    setProfile(data.data.user);
                } else if (url === '/logout') {
                    this.accessToken = '';
                    clearAccessTokenFromLS();
                }
                return response;
            },
            // xu ly loi tu server
            (error: AxiosError) => {
                // Chỉ toast lỗi không phải 422 và 401
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data;
                    const message = data.message || error.message;
                    toast.error(message);
                }
            },
        );
    }
}

const http = new Http().instance;

export default http;
