import { AuthContext } from "@/context/AuthContext"
import { LOGIN } from "@/services/auth/login"
import type { LoginError, LoginRequest, LoginResponse } from "@/types/auth"
import  { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"


const useLogin = ()  => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<LoginError | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const {login} = useContext(AuthContext)

    const handleLogin = async (request: LoginRequest) => {

        try {
            setLoading(true)
            const response : LoginError | LoginResponse = await LOGIN(request)  
            
            if((response as LoginResponse).success) {

                login((response as LoginResponse).token)
                setSuccess((response as LoginResponse).message)
                navigate("/")
                
            } else {
                setError(response as LoginError)
            }
            console.log(response);
            
        } catch (error) {
            setError(error as LoginError)
        } finally {
            setLoading(false)
        }
    }

    return {
        handleLogin,
        loading,
        error,
        success
    }

}

export default useLogin