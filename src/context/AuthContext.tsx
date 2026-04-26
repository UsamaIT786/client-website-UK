import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    token: string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('adminUser'));

    const login = (newToken: string, newUser: string) => {
        setToken(newToken);
        setUsername(newUser);
        localStorage.setItem('adminToken', newToken);
        localStorage.setItem('adminUser', newUser);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
