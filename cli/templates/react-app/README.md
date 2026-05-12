# Kit de démarrage React

Une application React complète et prête à l'emploi avec TypeScript, Tailwind CSS, shadcn/ui, React Router DOM, authentification (connexion/inscription) et bien plus.

## Caractéristiques

- Vite - Outil de construction rapide
- React 19 - Dernière version de React avec TypeScript
- Tailwind CSS - Framework CSS utilitaire
- shadcn/ui - Composants UI de qualité
- React Router DOM - Routage côté client
- Authentification - Connexion/Inscription avec contexte et axios
- Intégration API - Configuration Axios avec intercepteurs
- TypeScript - Sécurité de type complète
- ESLint - Vérification du code
- Hot Module Replacement - Développement rapide

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Create your project:
   ```bash
   npx @nosleepman/react-starter my-app
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API URL in `.env`:
   ```
   VITE_API_URL=https://your-api-url.com/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/           # API configuration and interceptors
├── components/    # Reusable UI components
│   ├── layouts/   # Layout components (navbar, etc.)
│   └── ui/        # shadcn/ui components
├── context/       # React contexts (AuthContext)
├── hooks/         # Custom hooks
├── pages/         # Page components
│   ├── auth/      # Login/Register pages
│   └── home/      # Home page
├── routes/        # Routing configuration
├── services/      # API service functions
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Authentication

The app includes a complete authentication system:

- **Login Page** (`/login`) - User login form
- **Register Page** (`/register`) - User registration form
- **Auth Context** - Manages authentication state
- **Protected Routes** - Route protection for authenticated users
- **Navbar** - Shows user info and logout button when authenticated

### API Endpoints

The app expects the following API endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/current-user` - Get current user info

### Request/Response Formats

#### Login
```typescript
// Request
{
  email: string;
  password: string;
}

// Response
{
  success: boolean;
  message: string;
  token: string;
  user: User;
}
```

#### Register
```typescript
// Request
{
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  // ... other fields
}

// Response
{
  success: boolean;
  message: string;
}
```

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/routes/appRoutes.tsx`
3. If it needs protection, wrap it in `PrivateRoutes`

### Adding New API Services

1. Create a new service file in `src/services/`
2. Use the `API` instance from `src/api/api.tsx`
3. Add types in `src/types/`

### UI Components

The app uses shadcn/ui components. To add new components:

```bash
npx shadcn add [component-name]
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Your API base URL

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios
- Lucide React (icons)
- Framer Motion (animations)
- Sonner (toasts)

## Contributing

Feel free to contribute to this starter kit by opening issues or pull requests.

## License

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
