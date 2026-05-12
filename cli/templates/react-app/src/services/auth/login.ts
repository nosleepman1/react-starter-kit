import API from "@/api/api"
import axios from "axios"
import type { LoginError, LoginRequest, LoginResponse } from "@/types/auth"


export const LOGIN = async (request: LoginRequest): Promise<LoginResponse | LoginError> => {
    try {
        const response = await API.post<LoginResponse>("/auth/login", request)
        return response.data

    } catch (error) {
        if (axios.isAxiosError<LoginError>(error)) { 
            return error.response?.data;
        }
    }
}
