# React Starter - Kit de démarrage complet

Un outil CLI (Command Line Interface) pour créer rapidement une application React complète et prête à l'emploi avec authentification, TypeScript, Tailwind CSS, shadcn/ui et bien d'autres fonctionnalités.

## Caractéristiques principales

- React 19 avec TypeScript pour une sécurité de type complète
- Vite comme bundler pour une compilation ultra-rapide
- Tailwind CSS pour le stylage utilitaire
- Composants shadcn/ui pré-installés et configurés
- React Router DOM v7 pour le routage côté client
- Système d'authentification complet (connexion, inscription, déconnexion)
- Axios configuré avec intercepteurs pour l'intégration API
- Contexte d'authentification pour la gestion d'état
- Routes protégées pour les pages authentifiées
- Barre de navigation avec informations utilisateur
- Support ESLint pour la qualité du code
- Hot Module Replacement (HMR) pour le développement rapide
- Configuration TypeScript stricte
- Fichier .env préconfigué pour les variables d'environnement

## Installation

### Prérequis

- Node.js version 18 ou supérieure
- npm ou yarn package manager

### Installation globale

Pour installer le CLI globalement sur votre système :

```bash
npm install -g @nosleepman/react-starter
```

## Utilisation

### Créer une nouvelle application

```bash
npx @nosleepman/react-starter my-app
```

Remplacez `my-app` par le nom de votre projet. Un dossier sera créé avec ce nom.

### Démarrer le développement

```bash
cd my-app
npm install
npm run dev
```

L'application s'ouvrira automatiquement sur http://localhost:5173

### Configuration de l'API

Avant de lancer l'application, vous DEVEZ configurer l'URL de votre API :

1. Ouvrez le fichier `.env` à la racine du projet
2. Modifiez la variable `VITE_API_URL` :

```
VITE_API_URL=https://votre-api.com/api/v1
```

L'application s'attend à une API RESTful avec les endpoints suivants :

- POST `/auth/login` pour la connexion
- POST `/auth/register` pour l'inscription
- GET `/auth/current-user` pour récupérer l'utilisateur actuel

## Structure du projet

```
my-app/
├── src/
│   ├── api/
│   │   └── api.tsx                 Configuration d'Axios et intercepteurs
│   ├── components/
│   │   ├── layouts/
│   │   │   └── navbar.tsx          Barre de navigation avec logout
│   │   └── ui/                     Composants shadcn/ui
│   ├── context/
│   │   └── AuthContext.tsx         Contexte global d'authentification
│   ├── hooks/
│   │   └── auth/
│   │       ├── useLogin.ts         Hook pour la connexion
│   │       └── useRegister.ts      Hook pour l'inscription
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.tsx           Page de connexion
│   │   │   └── register.tsx        Page d'inscription
│   │   └── home/
│   │       └── home.tsx            Page d'accueil protégée
│   ├── routes/
│   │   ├── appRoutes.tsx           Configuration des routes
│   │   └── privateRoutes.tsx       Wrapper pour les routes protégées
│   ├── services/
│   │   └── auth/
│   │       ├── login.ts            Service API pour connexion
│   │       ├── register.ts         Service API pour inscription
│   │       └── currentUser.ts      Service API utilisateur actuel
│   ├── types/
│   │   └── auth.ts                 Types TypeScript pour l'authentification
│   ├── App.tsx                     Composant principal
│   ├── main.tsx                    Point d'entrée
│   └── index.css                   Styles Tailwind
├── .env                            Variables d'environnement
├── package.json                    Dépendances et scripts
├── tsconfig.json                   Configuration TypeScript
├── vite.config.ts                  Configuration Vite
└── README.md                       Documentation du projet

```

## Système d'authentification

L'application inclut un système d'authentification complet et prêt à l'emploi.

### Pages d'authentification

- `/login` - Page de connexion avec validation de formulaire
- `/register` - Page d'inscription avec formulaires multiples
- `/` - Page d'accueil protégée (accessible uniquement si connecté)

### Flux d'authentification

1. L'utilisateur accède à `/login` ou `/register`
2. Les identifiants sont envoyés à l'API
3. L'API retourne un token JWT et les données utilisateur
4. Le token est sauvegardé dans localStorage
5. L'utilisateur est redirigé vers la page d'accueil
6. Les routes protégées deviennent accessibles
7. La barre de navigation affiche les informations utilisateur
8. Le bouton de déconnexion efface le token et redirige vers login

### Format des requêtes API

#### Connexion (POST /auth/login)

Requête :
```json
{
  "email": "utilisateur@exemple.com",
  "password": "motdepasse123"
}
```

Réponse réussie :
```json
{
  "success": true,
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "utilisateur@exemple.com",
    "firstname": "Jean",
    "lastname": "Dupont"
  }
}
```

#### Inscription (POST /auth/register)

Requête :
```json
{
  "email": "nouveau@exemple.com",
  "password": "motdepasse123",
  "firstname": "Jean",
  "lastname": "Dupont",
  "phone": "+33612345678"
}
```

Réponse réussie :
```json
{
  "success": true,
  "message": "Inscription réussie, veuillez vous connecter"
}
```

#### Utilisateur actuel (GET /auth/current-user)

En-têtes requis :
```
Authorization: Bearer {token}
```

Réponse :
```json
{
  "id": "123",
  "email": "utilisateur@exemple.com",
  "firstname": "Jean",
  "lastname": "Dupont"
}
```

## Scripts disponibles

```bash
npm run dev      Démarrer le serveur de développement avec HMR
npm run build    Créer une version de production optimisée
npm run preview  Prévisualiser la version de production localement
npm run lint     Vérifier la qualité du code avec ESLint
```

## Configuration avancée

### Ajouter une nouvelle page

1. Créez un fichier dans `src/pages/` :

```typescript
// src/pages/dashboard/dashboard.tsx
const Dashboard = () => {
  return <div>Tableau de bord</div>
}

export default Dashboard
```

2. Ajoutez la route dans `src/routes/appRoutes.tsx` :

```typescript
<Route element={<PrivateRoutes/>}>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Ajouter un nouveau service API

1. Créez un fichier dans `src/services/` :

```typescript
// src/services/projects/getProjects.ts
import API from "@/api/api"

export const GET_PROJECTS = async (token: string) => {
  try {
    const response = await API.get("/projects")
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des projets", error)
    throw error
  }
}
```

2. Utilisez-le dans un composant :

```typescript
import { GET_PROJECTS } from "@/services/projects/getProjects"

const MyComponent = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    GET_PROJECTS(token).then(setProjects)
  }, [])

  return <div>{/* afficher les projets */}</div>
}
```

### Ajouter des composants shadcn/ui supplémentaires

L'application contient déjà de nombreux composants shadcn/ui. Pour en ajouter d'autres :

```bash
npx shadcn-ui@latest add [nom-du-composant]
```

Par exemple pour ajouter le composant `DataTable` :

```bash
npx shadcn-ui@latest add data-table
```

### Personnaliser les thèmes

Modifiez `src/index.css` pour adapter les couleurs Tailwind CSS à votre branding.

## Variables d'environnement

Le fichier `.env` à la racine du projet contient :

```
# URL de base de votre API
VITE_API_URL=http://localhost:8000/api/v1
```

Vous pouvez ajouter d'autres variables avec le préfixe `VITE_` :

```
VITE_API_URL=https://api.monentreprise.com
VITE_TIMEOUT=30000
VITE_ENV=production
```

Les variables sont accessibles dans le code via :

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Gestion de l'état d'authentification

Le `AuthContext` gère l'authentification globale de l'application.

### Utiliser le contexte dans un composant

```typescript
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

const MonComposant = () => {
  const { user, token, isAuthenticated, logout } = useContext(AuthContext)

  return (
    <div>
      {isAuthenticated && <p>Bienvenue {user?.firstname}</p>}
      <button onClick={logout}>Déconnexion</button>
    </div>
  )
}
```

### Propriétés du contexte

- `user` - Objet utilisateur ou null
- `token` - Token JWT ou null
- `isAuthenticated` - Booléen indiquant si l'utilisateur est connecté
- `loading` - Booléen indiquant si l'authentification se charge
- `login(token)` - Fonction pour se connecter
- `logout()` - Fonction pour se déconnecter

## Intercepteurs Axios

L'API Axios est préconfigurée pour ajouter automatiquement le token JWT à chaque requête :

```typescript
API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

Vous n'avez pas besoin de gérer le token manuellement dans chaque requête.

## Résolution des problèmes courants

### Le port 5173 est déjà utilisé

```bash
npm run dev -- --port 3000
```

### Erreur de connexion à l'API

Vérifiez que :
1. L'URL dans `.env` est correcte
2. L'API est en cours d'exécution
3. Les en-têtes CORS sont configurés correctement sur l'API

### Les composants shadcn/ui ne s'affichent pas

Assurez-vous que Tailwind CSS est correctement configuré. Le fichier `tailwind.config.js` devrait exister à la racine du projet.

### Le token n'est pas sauvegardé

Vérifiez que localStorage n'est pas désactivé dans votre navigateur. Les variables de session privée/incognito n'enregistrent pas localStorage.

## Technologies utilisées

- React 19.2 - Bibliothèque UI
- TypeScript 6.0 - Langage typé pour JavaScript
- Vite 8.0 - Bundler et serveur de développement
- Tailwind CSS 4.2 - Framework CSS utilitaire
- shadcn/ui 4.6 - Composants UI de qualité
- React Router DOM 7.14 - Routage côté client
- Axios 1.16 - Client HTTP
- Lucide React 1.14 - Icônes vectorielles
- Framer Motion 12.38 - Animations fluides
- Sonner 2.0 - Notifications toasts
- React Query 5.100 - Gestion du cache et requêtes

## Performance

L'application utilise Vite qui offre :

- Compilation ultra-rapide du code TypeScript
- Hot Module Replacement instantané
- Bundling optimisé pour la production
- Code splitting automatique
- Minification et compression du code

## Sécurité

- Les tokens JWT sont stockés de manière sécurisée
- Les mots de passe ne sont jamais exposés côté client
- Les routes privées sont protégées avec PrivateRoutes
- Validation des formulaires côté client
- Intercepteurs Axios pour gérer automatiquement l'authentification

## Déploiement

### Pour Vercel

```bash
npm run build
vercel
```

### Pour Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Pour un serveur classique

```bash
npm run build
# Déployer le contenu du dossier 'dist' sur votre serveur
```

## Contributions

Les contributions sont les bienvenues. N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT - Libre d'utilisation dans vos projets commerciaux et personnels.

## Support et documentation

Pour plus d'informations :
- Documentation React : https://react.dev
- Documentation Vite : https://vitejs.dev
- Documentation Tailwind : https://tailwindcss.com
- Documentation shadcn/ui : https://ui.shadcn.com
- Documentation React Router : https://reactrouter.com

## Version

Actuellement en version 1.0.0

Pour les mises à jour et nouvelles versions, exécutez :

```bash
npm install -g @nosleepman/react-starter
```