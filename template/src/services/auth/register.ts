import API from '@/api/api'
import axios from 'axios'
import type { ApiError, RegisterRequest, RegisterResponse } from '@/types/auth'
import { NetworkError } from './login'

export const REGISTER = async (request: RegisterRequest): Promise<RegisterResponse | ApiError> => {
  try {
    // Adaptation du payload pour l'API (snake_case si nécessaire)
    const payload = {
      name: request.name,
      email: request.email,
      password: request.password,
      password_confirmation: request.passwordConfirmation,
    }

    const response = await API.post<RegisterResponse>('/auth/register', payload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new NetworkError()
      }
      const data = error.response.data as ApiError
      return {
        success: false,
        message: data?.message ?? `Erreur ${error.response.status}`,
        errors: data?.errors,
      }
    }
    throw new Error('Une erreur inattendue est survenue lors de l\'inscription.')
  }
}