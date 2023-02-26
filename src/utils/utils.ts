import axios, { AxiosError } from 'axios';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { number, string } from 'yup';

// xu ly loi tra ve tu api
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // quy dinh type tra ve
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
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
