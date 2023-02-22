import React, { createContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getProfile } from 'src/utils/auth';

interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile);
    const value = {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
