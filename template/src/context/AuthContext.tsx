import { createContext, useCallback, useContext, useEffect } from 'react'
import type { AuthContextType, User } from '@/types/auth'
import CURRENT_USER from '@/services/auth/currentUser'
import { tokenStore } from '@/lib/tokenStore'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()

  const { data: user = null, isLoading, isError } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = tokenStore.get()
      if (!token) return null
      return await CURRENT_USER(token)
    },
    retry: false, // Pas de retry automatique sur erreur d'auth
    staleTime: 1000 * 60 * 5, // 5 min
  })

  const logout = useCallback((): void => {
    tokenStore.clear()
    queryClient.setQueryData(['currentUser'], null)
  }, [queryClient])

  useEffect(() => {
    if (isError) {
      logout()
    }
  }, [isError, logout])

  const login = useCallback(async (newToken: string): Promise<void> => {
    tokenStore.set(newToken)
    try {
      const currentUser = await queryClient.fetchQuery({
        queryKey: ['currentUser'],
        queryFn: () => CURRENT_USER(newToken),
      })
      if (!currentUser) throw new Error('Impossible de récupérer le profil utilisateur.')
    } catch {
      tokenStore.clear()
      throw new Error('Impossible de récupérer le profil utilisateur.')
    }
  }, [queryClient])

  // On considère que ça charge si react-query charge ET qu'on a un token
  const loading = isLoading && tokenStore.hasToken()
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
