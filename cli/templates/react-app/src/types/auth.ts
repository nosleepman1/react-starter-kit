
export interface LoginResponse {
    user: User
    token: string
    success: boolean
    message: string
    role: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginError {
    message: string,
    success: boolean
}   

//-----------------------------------------------------------------

export interface RegisterResponse {
    success: boolean,
    message: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface RegisterError {
    message: string
    errors: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
}

//---------------------------------------------------------

export interface User {
    id: number
    email: string
    name?: string
} 

export interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (newToken : string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}