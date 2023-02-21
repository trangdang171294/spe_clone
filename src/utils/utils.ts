import axios, { AxiosError } from 'axios';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';

// xu ly loi tra ve tu api
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // quy dinh type tra ve
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}
