import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './appRoutes'
import { AuthProvider } from '../context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

// Crée un client unique pour les tests afin de ne pas polluer le cache
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('App Routing', () => {
  it('renders the login page by default when not authenticated', () => {
    const queryClient = createTestQueryClient()
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    )

    // Vérifie que le titre "Bon retour" de la page de connexion s'affiche bien
    expect(screen.getByText('Bon retour')).toBeInTheDocument()
  })

  it('renders the NotFound page for unknown routes', () => {
    const queryClient = createTestQueryClient()
    
    render(
      <MemoryRouter initialEntries={['/une-route-inexistante']}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    )

    // Vérifie que le texte "404" et le message d'erreur drôle s'affichent
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Houston, on a un problème.')).toBeInTheDocument()
  })
})
