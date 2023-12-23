import React, { useContext, useState } from "react"

export type AuthContextType = {
    token: string | null
    isAuthenticated: boolean
    authenticate: (token: string | null) => void
    logout: () => void
}

const defaultAuthContext = {
    token: null,
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
}

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [authToken, setAuthToken] = useState<string | null>(null)

    const authenticate = (token: string | null) => {
        setAuthToken(token);
    }

    const logout = () => {
        setAuthToken(null);
    }


    const contextValue = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext<AuthContextType>(AuthContext);
}