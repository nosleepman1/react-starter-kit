import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center w-full">
      <div className="text-lg font-semibold">My App</div>
      <div className="flex items-center gap-4">
        <span>Welcome, {user?.name}</span>
        <Button onClick={logout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  )
}

export default Navbar