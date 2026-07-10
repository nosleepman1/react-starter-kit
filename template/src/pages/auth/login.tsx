import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { loginSchema, type LoginFormValues } from '@/lib/schemas'
import useLogin from '@/hooks/auth/useLogin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SocialButton from '@/components/ui/social-button'

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, staggerChildren: 0.07 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}


// ─── Component ────────────────────────────────────────────────────────────────

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleLogin, loading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormValues) => {
    await handleLogin(data)
  }

  const isLoading = loading || isSubmitting

  return (
    <div className="auth-page-bg">
      {/* Background gradient orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />

      <motion.div
        className="auth-card"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="auth-header">
          <div className="auth-logo">
            <Sparkles className="size-5 text-primary" />
          </div>
          <h1 className="auth-title">Bon retour</h1>
          <p className="auth-subtitle">Connectez-vous à votre compte pour continuer</p>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={item} className="auth-social-group">
          <SocialButton provider="google" onClick={() => {}} />
          <SocialButton provider="github" onClick={() => {}} />
          <SocialButton provider="apple" onClick={() => {}} />
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} className="auth-divider">
          <span>ou continuez avec votre email</span>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="auth-form"
        >
          {/* Email field */}
          <div className="auth-field">
            <Label htmlFor="email" className="auth-label">
              Email
            </Label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" />
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                className={`auth-input pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                autoComplete="email"
                disabled={isLoading}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="auth-error"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password field */}
          <div className="auth-field">
            <Label htmlFor="password" className="auth-label">
              Mot de passe
            </Label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`auth-input pl-10 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                autoComplete="current-password"
                disabled={isLoading}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="auth-eye-btn"
                tabIndex={-1}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="auth-error"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <Link to="/forgot-password" className="auth-link text-xs">
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </Button>
        </motion.form>

        {/* Footer */}
        <motion.p variants={item} className="auth-footer">
          Pas encore de compte ?{' '}
          <Link to="/register" className="auth-link font-semibold">
            Créer un compte
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Login