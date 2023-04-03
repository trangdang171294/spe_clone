import React, { createContext, useState } from 'react';
import { extendedPurchasesType } from 'src/types/purchase.type';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getProfile } from 'src/utils/auth';

interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
    extendedPurchases: extendedPurchasesType[];
    setExtendedPurchases: React.Dispatch<React.SetStateAction<extendedPurchasesType[]>>;
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null,
    extendedPurchases: [],
    setExtendedPurchases: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile);
    const [extendedPurchases, setExtendedPurchases] = useState<extendedPurchasesType[]>(
        initialAppContext.extendedPurchases,
    );
    const value = {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
