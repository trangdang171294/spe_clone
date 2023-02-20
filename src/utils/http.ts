import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';

class Http {
    instance: AxiosInstance;
    constructor() {
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
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
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
