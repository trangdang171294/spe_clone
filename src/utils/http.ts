import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type';
import {
    clearAccessTokenFromLS,
    getAccessTokenFromLS,
    getRefreshTokenFromLS,
    saveAccessTokenToLocalStorage,
    saveRefreshTokenToLocalStorage,
    setProfileLS,
} from './auth';
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api';
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils';
import { ErrorResponse } from 'src/types/utils.type';

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    private refreshToken: string;
    private refreshTokenRequest: Promise<string> | null;
    constructor() {
        // viec tao them 1 bien de gan vao la de nhanh hon, doc du lieu o localstorage lau hon
        this.accessToken = getAccessTokenFromLS();
        this.refreshToken = getRefreshTokenFromLS();
        this.refreshTokenRequest = null;
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                // config gui len header
                // 'expire-access-token': 60 * 60 * 24, // 1 ngày
                // 'expire-refresh-token': 60 * 60 * 24 * 160, // 160 ngày
                'expire-access-token': 10,
                'expire-refresh-token': 60 * 60,
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
                if (url === URL_LOGIN || url === URL_REGISTER) {
                    const data = response.data as AuthResponse;
                    this.accessToken = data.data.access_token;
                    this.refreshToken = data.data.refresh_token;
                    saveAccessTokenToLocalStorage(this.accessToken);
                    saveRefreshTokenToLocalStorage(this.refreshToken);
                    setProfileLS(data.data.user);
                } else if (url === URL_LOGOUT) {
                    this.accessToken = '';
                    this.refreshToken = '';
                    clearAccessTokenFromLS();
                }
                return response;
            },
            // xu ly loi tu server
            (error: AxiosError) => {
                // Chỉ toast lỗi không phải 422 và 401
                if (
                    ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
                        error.response?.status as number,
                    )
                ) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message);
                }

                // Lỗi Unauthorized (401) có rất nhiều trường hợp
                // - Token không đúng
                // - Không truyền token
                // - Token hết hạn*

                //loi 401
                if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
                    const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
                    const { url } = config;
                    // Trường hợp Token hết hạn và request đó không phải là của request refresh token
                    // thì chúng ta mới tiến hành gọi refresh token
                    // ?? hmm
                    if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => {
                                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                                  // chua loi goi refresh 2 lan
                                  setTimeout(() => {
                                      this.refreshTokenRequest = null;
                                  }, 10000);
                              });
                        return this.refreshTokenRequest.then((access_token) => {
                            //lay access token moi va gan vao header
                            // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
                            return this.instance({
                                ...config,
                                headers: { ...config.headers, authorization: access_token },
                            });
                        });
                    }

                    // Còn những trường hợp như token không đúng
                    // không truyền token,
                    // token hết hạn nhưng gọi refresh token bị fail
                    // thì tiến hành xóa local storage và toast message

                    clearAccessTokenFromLS();
                    this.accessToken = '';
                    this.refreshToken = '';
                    toast.error(error.response?.data.data?.message || error.response?.data.message);
                }
            },
        );
    }

    private handleRefreshToken() {
        return this.instance
            .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
                refresh_token: this.refreshToken,
            })
            .then((res) => {
                const { access_token } = res.data.data;
                saveAccessTokenToLocalStorage(access_token);
                this.accessToken = access_token;
                return access_token;
            })
            .catch((error) => {
                clearAccessTokenFromLS();
                this.accessToken = '';
                this.refreshToken = '';
                throw error;
            });
    }
}

const http = new Http().instance;

export default http;
