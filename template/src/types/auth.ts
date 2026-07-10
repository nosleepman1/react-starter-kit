
// ─── Auth Requests ────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// ─── Auth Responses ───────────────────────────────────────────────────────────

export interface LoginResponse {
  success: true
  token: string
  message: string
  user: User
}

export interface RegisterResponse {
  success: true
  message: string
}

// ─── Auth Errors ──────────────────────────────────────────────────────────────

export interface ApiError {
  success: false
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    passwordConfirmation?: string[]
  }
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

// ─── Auth Context ─────────────────────────────────────────────────────────────

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => void
  loading: boolean
}