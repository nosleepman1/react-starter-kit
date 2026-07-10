import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useAuth()  

    if (loading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes

