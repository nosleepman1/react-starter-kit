import { REGISTER } from "@/services/auth/register"
import type { RegisterError, RegisterRequest, RegisterResponse } from "@/types/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



 const useRegister = () => {
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<RegisterError | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const register = async (request: RegisterRequest)  => {
       
        try {
            setLoading(true)
            setError(null)
            const response : RegisterResponse | RegisterError = await REGISTER(request)  
            
            if((response as RegisterResponse).success) {
                setSuccess((response as RegisterResponse).message)
                navigate("/login")
            } else {
                setError(response as RegisterError)
            }


        } catch (error) {  
            setError(error as RegisterError)
        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error, success }
}

export default useRegister