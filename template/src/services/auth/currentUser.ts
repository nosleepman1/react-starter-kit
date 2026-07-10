import API from '@/api/api'
import type { User } from '@/types/auth'
import axios from 'axios'

const CURRENT_USER = async (token: string): Promise<User> => {
  const response = await API.get<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.data) {
    throw new Error('Réponse invalide du serveur lors de la récupération du profil.')
  }

  return response.data
}

export default CURRENT_USER

// ─── Helper: Is API error ─────────────────────────────────────────────────────

export function isNetworkError(error: unknown): boolean {
  return axios.isAxiosError(error) && !error.response
}