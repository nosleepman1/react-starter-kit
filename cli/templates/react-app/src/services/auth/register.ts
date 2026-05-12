import API from "@/api/api"
import type { RegisterError, RegisterRequest, RegisterResponse } from "@/types/auth"
import axios from "axios"


export const REGISTER = async (request: RegisterRequest) => {
    try {
        const response = await API.post<RegisterResponse>("auth/register", request)
        return response.data
    } catch (error) {
        if (axios.isAxiosError<RegisterError>(error)) { 
            return error.response?.data;
        }
        
    }
}