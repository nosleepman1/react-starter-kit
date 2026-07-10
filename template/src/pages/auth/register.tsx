import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, Eye, EyeOff, User, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { registerSchema, type RegisterFormValues, getPasswordStrength } from '@/lib/schemas'
import useRegister from '@/hooks/auth/useRegister'
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
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}


// ─── Component ────────────────────────────────────────────────────────────────

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { register: registerUser, loading } = useRegister()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const passwordValue = watch('password', '')
  const strength = getPasswordStrength(passwordValue)
  const isLoading = loading || isSubmitting

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data)
  }

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
          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-subtitle">Rejoignez-nous — c'est rapide et gratuit</p>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={item} className="auth-social-group">
          <SocialButton provider="google" onClick={() => {}} />
          <SocialButton provider="github" onClick={() => {}} />
          <SocialButton provider="apple" onClick={() => {}} />
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} className="auth-divider">
          <span>ou créez un compte avec votre email</span>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="auth-form"
        >
          {/* Name field */}
          <div className="auth-field">
            <Label htmlFor="name" className="auth-label">
              Nom complet
            </Label>
            <div className="auth-input-wrapper">
              <User className="auth-input-icon" />
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                className={`auth-input pl-10 ${errors.name ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                autoComplete="name"
                disabled={isLoading}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="auth-error"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

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
                autoComplete="new-password"
                disabled={isLoading}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="auth-eye-btn"
                tabIndex={-1}
                aria-label={showPassword ? 'Masquer' : 'Afficher'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Password strength meter */}
            {passwordValue.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="password-strength"
              >
                <div className="password-strength-bars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`password-strength-bar ${i < strength.score ? strength.color : 'bg-muted'}`}
                    />
                  ))}
                </div>
                <span className="password-strength-label">{strength.label}</span>
              </motion.div>
            )}

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

          {/* Password confirmation field */}
          <div className="auth-field">
            <Label htmlFor="passwordConfirmation" className="auth-label">
              Confirmer le mot de passe
            </Label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" />
              <Input
                id="passwordConfirmation"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className={`auth-input pl-10 pr-10 ${errors.passwordConfirmation ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                autoComplete="new-password"
                disabled={isLoading}
                {...register('passwordConfirmation')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="auth-eye-btn"
                tabIndex={-1}
                aria-label={showConfirm ? 'Masquer' : 'Afficher'}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.passwordConfirmation && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="auth-error"
              >
                {errors.passwordConfirmation.message}
              </motion.p>
            )}
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
                Création du compte...
              </>
            ) : (
              'Créer mon compte'
            )}
          </Button>
        </motion.form>

        {/* Terms */}
        <motion.p variants={item} className="auth-terms">
          En créant un compte, vous acceptez nos{' '}
          <Link to="/terms" className="auth-link">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link to="/privacy" className="auth-link">
            Politique de confidentialité
          </Link>
        </motion.p>

        {/* Footer */}
        <motion.p variants={item} className="auth-footer">
          Déjà un compte ?{' '}
          <Link to="/login" className="auth-link font-semibold">
            Se connecter
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Register