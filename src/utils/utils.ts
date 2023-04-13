import axios, { AxiosError } from 'axios';
import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import userPlacholder from 'src/assets/images/user-icon-image-placeholder.jpg';
import { ErrorResponse } from 'src/types/utils.type';

// xu ly loi tra ve tu api
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // quy dinh type tra ve
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
}

//loi khac 401
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

//loi 401
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return (
        isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
        error.response?.data?.data?.name === 'EXPIRED_TOKEN'
    );
}

export function formatCurrency(currecy: number) {
    return new Intl.NumberFormat('de-DE').format(currecy);
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase();
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%';

export const removeSpecialCharacter = (str: string) =>
    // eslint-disable-next-line no-useless-escape
    str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameid = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

export const getIdfromNameId = (nameId: string) => {
    const arr = nameId.split('-i-');
    return arr[arr.length - 1];
};

export const getAvatarUrl = (avatarName?: string) =>
    avatarName ? `${config.baseUrl}images/${avatarName}` : userPlacholder;
