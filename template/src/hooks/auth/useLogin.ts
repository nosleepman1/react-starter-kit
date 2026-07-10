import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthContext } from '@/context/AuthContext'
import { LOGIN } from '@/services/auth/login'
import { NetworkError } from '@/services/auth/login'
import type { LoginRequest } from '@/types/auth'

const useLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useLogin doit être utilisé dans un AuthProvider')
  }

  const { login } = context

  const handleLogin = async (request: LoginRequest) => {
    try {
      setLoading(true)
      const response = await LOGIN(request)

      if (response.success) {
        // Attendre que le profil utilisateur soit chargé AVANT de rediriger
        // Corrige la race condition (ancien code ne faisait pas await)
        await login(response.token)
        toast.success(response.message || 'Connexion réussie')
        navigate('/')
      } else {
        toast.error(response.message || 'Identifiants invalides')
        return { error: response }
      }
    } catch (error) {
      if (error instanceof NetworkError) {
        toast.error('Connexion impossible. Vérifiez votre réseau.')
      } else {
        toast.error('Une erreur inattendue est survenue. Réessayez plus tard.')
        console.error('[useLogin]', error)
      }
      return { error }
    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, loading }
}

export default useLogin