# Architecture Technique

Ce document décrit les choix d'architecture, les modèles de conception et les contraintes de sécurité implémentés dans le React Starter Kit.

## Architecture de Génération (Monorepo)

Afin de préserver une séparation stricte des responsabilités, le dépôt est divisé en deux parties distinctes :

1. **template/** : Ce dossier contient l'application React. Le fait de le conserver dans un dossier autonome permet aux développeurs de cloner le projet directement, et permet au template d'exécuter les outils de vérification (ESLint, TypeScript) de manière isolée.
2. **cli/** : Un CLI léger publié sur npm sous le nom de `@nosleepman/react-starter`. Il ne contient pas les fichiers du template localement. Lors de son exécution, il utilise `degit` pour télécharger directement le sous-dossier `template` depuis le dépôt GitHub.

Cette structure élimine le risque de publier des dépendances de développement locales (comme `hono` ou `@modelcontextprotocol/sdk` utilisées par les outils CLI) dans le bundle de production de l'application cliente React.

## Stack Technique & Justifications

### React 19 & TypeScript
L'utilisation de la dernière version de React garantit un support à long terme et un support natif pour les nouvelles fonctionnalités du compilateur. TypeScript est configuré en mode strict pour détecter les erreurs de type lors de la compilation, éliminant ainsi les plantages liés aux types lors de l'exécution.

### Vite
Vite est utilisé comme outil de build à la place de Webpack. Il s'appuie sur les modules ES natifs en cours de développement, permettant un remplacement de module à chaud (HMR) quasi instantané et des builds Rollup optimisés pour la production.

### Tailwind CSS v4 & Palette de Couleurs OKLCH
Tailwind CSS v4 introduit une configuration basée sur le CSS. Les définitions de couleurs utilisent l'espace colorimétrique OKLCH, qui fournit une clarté perçue uniforme, permettant des dégradés plus lisses et des rapports de contraste cohérents en mode clair comme en mode sombre.

### Zod & React Hook Form
Les entrées des formulaires sont validées côté client à l'aide de schémas Zod avant d'être envoyées au serveur. L'intégration de Zod avec React Hook Form évite la gestion manuelle de l'état des formulaires et fournit des messages d'erreur au niveau du champ automatiques, accessibles et animés.

## Contrôles de Sécurité

### Gestion des Jetons (Protection contre les failles XSS)
Les templates classiques stockent les jetons JWT dans le `localStorage`. Cela rend les applications très vulnérables aux attaques de type Cross-Site Scripting (XSS), car n'importe quel script s'exécutant sur la page peut accéder au `localStorage` et voler le jeton.

Pour résoudre ce problème :
- Les jetons sont stockés dans un module JavaScript dédié (`src/lib/tokenStore.ts`) au sein d'une variable privée en mémoire vive.
- Pour la persistance de session à court terme (durée de vie d'un onglet), le jeton est écrit dans le `sessionStorage` (qui est isolé et effacé automatiquement à la fermeture de l'onglet) plutôt que dans le `localStorage`.
- En production, nous recommandons de configurer l'API serveur pour renvoyer les jetons d'authentification sous forme de cookies HttpOnly, les rendant totalement inaccessibles au JavaScript.

### Couche Réseau & Intercepteurs
L'instance Axios (`src/api/api.tsx`) gère automatiquement :
- L'injection de l'en-tête d'autorisation (`Authorization: Bearer <token>`) à partir du `tokenStore` de manière dynamique lors de chaque requête.
- La gestion globale des réponses 401. Si une requête renvoie un code d'état 401 (Non autorisé), l'intercepteur efface automatiquement la session et redirige l'utilisateur vers l'écran de connexion.
- Une protection contre les requêtes HTTP suspendues avec un délai d'attente (timeout) configuré à 15 secondes.

## Gestion d'État & Cache Client

### AuthContext
L'AuthContext gère l'état de l'utilisateur actuel (`user`, `isAuthenticated`, `loading`). Il se synchronise avec le `tokenStore` au démarrage pour récupérer les détails de l'utilisateur depuis l'endpoint `/auth/me` du serveur.

### React Query (TanStack Query)
Pour les requêtes de données allant au-delà de l'authentification, TanStack Query est initialisé à la racine de l'application. Il fournit un système de cache intégré pour les requêtes, des tentatives automatiques en cas d'échec, des rafraîchissements en arrière-plan et une synchronisation de l'état entre les composants.
