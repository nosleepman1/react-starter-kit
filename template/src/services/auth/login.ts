import API from '@/api/api'
import axios from 'axios'
import type { ApiError, LoginRequest, LoginResponse } from '@/types/auth'

export class NetworkError extends Error {
  constructor(message = 'Impossible de joindre le serveur. Vérifiez votre connexion.') {
    super(message)
    this.name = 'NetworkError'
  }
}

export const LOGIN = async (request: LoginRequest): Promise<LoginResponse | ApiError> => {
  try {
    const response = await API.post<LoginResponse>('/auth/login', request)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Erreur réseau (pas de réponse du serveur)
      if (!error.response) {
        throw new NetworkError()
      }
      // Erreur HTTP avec réponse du serveur (401, 422, etc.)
      const data = error.response.data as ApiError
      return {
        success: false,
        message: data?.message ?? `Erreur ${error.response.status}`,
        errors: data?.errors,
      }
    }
    // Erreur inattendue (bug dans le code)
    throw new Error('Une erreur inattendue est survenue lors de la connexion.')
  }
}
