import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from 'src/locales/en/home.json';
import HOME_VI from 'src/locales/vi/home.json';
import HEADER_EN from 'src/locales/en/header.json';
import HEADER_VI from 'src/locales/vi/header.json';

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt',
} as const;

const resources = {
    en: {
        home: HOME_EN,
        header: HEADER_EN,
    },
    vi: {
        home: HOME_VI,
        header: HEADER_VI,
    },
} as const;

export const defaultNS = 'home';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    ns: ['home', 'header'],
    fallbackLng: 'vi',
    defaultNS,
    interpolation: {
        escapeValue: false,
    },
});
