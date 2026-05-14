
import { createContext, useEffect, useState } from "react"
import type { User } from "@/types/auth"
import CURRENT_USER from "@/services/auth/currentUser"
import type { AuthContextType } from "@/types/auth"

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [loading, setLoading] = useState<boolean>(true)


   const login = async (newToken : string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        const currentUser = await CURRENT_USER(newToken)
        setUser(currentUser)
    }

   const logout = () : Promise<void> => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    return Promise.resolve()
   }

   useEffect(() => {
    const loadUser = async () => {
        const storedToken = token ?? localStorage.getItem('token')
        if(storedToken) {
            try {
                const currentUser = await CURRENT_USER(storedToken)
                setUser(currentUser)
            } catch {
                logout()
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    loadUser()
   }, [token])
   
   const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading } }>
            {children}
        </AuthContext.Provider>
    )
}

