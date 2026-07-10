import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AuthContextType, User } from '@/types/auth'
import CURRENT_USER from '@/services/auth/currentUser'
import { tokenStore } from '@/lib/tokenStore'

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(tokenStore.hasToken())

  const logout = useCallback((): void => {
    tokenStore.clear()
    setUser(null)
  }, [])

  const login = useCallback(async (newToken: string): Promise<void> => {
    tokenStore.set(newToken)
    try {
      const currentUser = await CURRENT_USER(newToken)
      setUser(currentUser)
    } catch {
      // Si la récupération du profil échoue, on invalide la session
      tokenStore.clear()
      throw new Error('Impossible de récupérer le profil utilisateur.')
    }
  }, [])

  // Restauration de session au démarrage
  useEffect(() => {
    const storedToken = tokenStore.get()

    if (!storedToken) {
      setLoading(false)
      return
    }

    let cancelled = false

    CURRENT_USER(storedToken)
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch(() => {
        // Token expiré ou invalide → on purge
        if (!cancelled) logout()
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [logout])

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  }
  return context
}
