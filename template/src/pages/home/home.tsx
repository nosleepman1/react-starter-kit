import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

const Home = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Bienvenue !
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {user && (
            <div className="text-center space-y-2">
              <p className="text-lg text-gray-700">
                Bonjour, <span className="font-semibold text-blue-600">{user.name}</span>
              </p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          )}

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Votre application React avec authentification est prête !
            </p>

            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                Fonctionnalités disponibles :
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Connexion/Inscription</li>
                <li>• Routes protégées</li>
                <li>• Gestion d'état d'authentification</li>
                <li>• API avec Axios</li>
                <li>• Interface moderne avec shadcn/ui</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home