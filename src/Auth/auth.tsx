import { createContext, ReactNode, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { login, logout, selectUser } from '../store/reducers/authReducer'
import { useLocation, Navigate } from 'react-router-dom'

interface AuthContextType {
    user: string
    signIn: (userId: string) => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const signIn = (userId: string) => {
        dispatch(login(userId))
    }

    const signOut = () => {
        dispatch(logout())
    }

    const value = { user, signIn, signOut }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const auth = useAuth()
    const location = useLocation()

    if(!auth.user){
        return <Navigate to="/login" state={{ from: location }}/>
    }

    return children
}