import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { REGISTER } from '@/services/auth/register'
import { NetworkError } from '@/services/auth/login'
import type { RegisterRequest } from '@/types/auth'

const useRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const register = async (request: RegisterRequest) => {
    try {
      setLoading(true)
      const response = await REGISTER(request)

      if (response.success) {
        toast.success(response.message || 'Compte créé avec succès !')
        navigate('/login')
        return { success: true }
      } else {
        // Erreur serveur avec message
        toast.error(response.message || 'Inscription échouée. Vérifiez vos informations.')
        return { error: response }
      }
    } catch (error) {
      if (error instanceof NetworkError) {
        toast.error('Connexion impossible. Vérifiez votre réseau.')
      } else {
        toast.error('Une erreur inattendue est survenue. Réessayez plus tard.')
        console.error('[useRegister]', error)
      }
      return { error }
    } finally {
      setLoading(false)
    }
  }

  return { register, loading }
}

export default useRegister