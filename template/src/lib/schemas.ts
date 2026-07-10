import { z } from 'zod'

// ─── Login Schema ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// ─── Register Schema ──────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
    email: z
      .string()
      .min(1, 'L\'email est requis')
      .email('Adresse email invalide'),
    password: z
      .string()
      .min(1, 'Le mot de passe est requis')
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    passwordConfirmation: z
      .string()
      .min(1, 'La confirmation du mot de passe est requise'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirmation'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

// ─── Password strength helper ─────────────────────────────────────────────────

export function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
} {
  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const levels = [
    { label: 'Très faible', color: 'bg-red-500' },
    { label: 'Faible', color: 'bg-orange-500' },
    { label: 'Moyen', color: 'bg-yellow-500' },
    { label: 'Fort', color: 'bg-blue-500' },
    { label: 'Très fort', color: 'bg-emerald-500' },
  ]

  return {
    score,
    ...levels[Math.min(score, levels.length - 1)],
  }
}
