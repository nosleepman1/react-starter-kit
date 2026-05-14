import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
 import Register from "@/pages/auth/register"
import Home from "@/pages/home/home"
import PrivateRoutes from "./privateRoutes"


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
