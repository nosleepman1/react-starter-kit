import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"

import useRegister from "@/hooks/auth/useRegister"

import type { RegisterRequest } from "@/types/auth"
import { Spinner } from "@/components/ui/spinner"


const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')

    const { register, loading, error, success } = useRegister()

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const request: RegisterRequest = {
            email,
            password,
            name,
        }
        register(request)
    }


    return (

        <Card className="w-full py-10 px-2 max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">Inscription</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center mt-2 text-sm text-muted-foreground">Créez votre compte</p>
                <form
                    onSubmit={handleRegister}
                    className="mt-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center mb-4">
                                {error.message}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg text-center mb-4">
                                {success}
                            </div>
                        )}



                            <div className="grid gap-2">
                                <Label htmlFor="name">Nom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Votre nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Spinner className="w-4 h-4 mr-2" /> : null}
                                S'inscrire
                            </Button>
                        </div>

                        <div className="text-center text-sm mt-4">
                            Déjà un compte?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Se connecter
                            </Link>
                        </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Register