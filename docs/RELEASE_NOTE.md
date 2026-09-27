# Release Notes - v1.2.0

We are thrilled to release React Starter Kit v1.2.0! This version introduces a complete testing infrastructure with Vitest, a more robust state management using React Query, and a highly polished, animated 404 page.

---

## English (EN)

### Key Features and Enhancements

#### 1. Testing Infrastructure (Vitest & React Testing Library)
- **Zero-config Testing:** Integrated `vitest`, `jsdom`, and `@testing-library/react` seamlessly into Vite.
- **Robust Mocks:** Automatically mocks unsupported browser features (like `window.matchMedia`) in the `setupTests.ts` file.
- **Blueprint Test Suite:** Added `appRoutes.test.tsx` providing a robust example of how to test routing and Context providers.

#### 2. Global State & React Query Refactoring
- **React Query Migration:** Completely refactored `AuthContext.tsx` to utilize `@tanstack/react-query` instead of manual `useState`/`useEffect` hooks.
- **Synchronized Data:** Authentication now leverages React Query's robust caching, automatic error state handling, and global background refetching.

#### 3. Animated 404 "Not Found" Page
- **Polished 404 UX:** Introduced a fun, interactive 404 page for unknown routes.
- **Framer Motion Elements:** Features a continuously levitating ghost icon, animated question marks, a glitchy 404 text effect, and an engaging copywriting message.

#### 4. UI & Layout Bug Fixes
- **Layout Adjustments:** Fixed an unexpected vertical scrollbar issue in `App.tsx` by applying precise `flex-col` and `flex-1` utilities.
- **Interactive Social Logins:** Added visual feedback (`sonner` toasts) to the Social Login buttons so developers aren't left with dead clicks out-of-the-box.

#### 5. Security & Dependency Updates
- **Clean Audit:** Successfully resolved 15 dependencies vulnerabilities (10 high, 4 moderate) across both the `cli` and `template` packages, bringing the repository back to **0 known vulnerabilities**.

---

## Français (FR)

### Fonctionnalités Clés et Améliorations

#### 1. Infrastructure de Tests (Vitest & React Testing Library)
- **Tests intégrés :** Mise en place complète de `vitest`, `jsdom` et `@testing-library/react` directement intégrés à Vite.
- **Mocks automatiques :** Création d'un fichier `setupTests.ts` qui s'occupe de mocker proprement `window.matchMedia` (requis par `next-themes`).
- **Suite de tests de référence :** Ajout de `appRoutes.test.tsx` pour tester le routage de l'application et vérifier le bon rendu des pages selon l'état d'authentification.

#### 2. Refactorisation avec React Query
- **Migration AuthContext :** Remplacement de la logique manuelle de récupération de l'utilisateur par le hook `useQuery` de `@tanstack/react-query`.
- **Fiabilité accrue :** La gestion du cache, du chargement initial et des erreurs (401) est désormais nativement prise en charge et synchronisée par React Query.

#### 3. Page 404 Animée (Not Found)
- **Expérience Utilisateur (UX) :** Création d'une page 404 amusante et mémorable pour intercepter les routes inexistantes.
- **Animations fluides :** Utilisation de `framer-motion` pour animer un petit fantôme lévitant, afficher un texte 404 "glitchy" et un message d'erreur humoristique.

#### 4. Correction de l'UI et du Layout
- **Structure CSS :** Résolution d'un problème de hauteur générant un défilement inutile dans `App.tsx` grâce à l'utilisation appropriée de `flex-1` et `flex-col`.
- **Boutons interactifs :** Les boutons de connexion sociale ("Continuer avec Google/Apple...") affichent désormais des notifications Toast pour indiquer au développeur que la fonctionnalité reste à implémenter.

#### 5. Sécurité & Mise à jour des dépendances
- **Audit propre :** Correction de 15 vulnérabilités (dont 10 critiques) en mettant à jour de nombreux paquets (tels qu'`axios` et `hono`) sur le `template` et l'outil `cli`. Le dépôt affiche de nouveau 0 faille de sécurité.

---

# Release Notes - v1.1.0

We are excited to announce the release of React Starter Kit v1.1.0. This release introduces a major architectural overhaul, transforming the project into a modern monorepo, fixing critical security vulnerabilities, adding a next-generation UI design, and integrating robust form validations.

---

## English (EN)

### Key Features and Enhancements

#### 1. Monorepo Architecture and Lightweight CLI
- **New Structure:** The project is now organized as a clean monorepo. The React template lives in `template/` at the root, and the CLI code resides in `cli/`.
- **Subdirectory Pulling:** The CLI tool `@nosleepman/react-starter` is now a tiny wrapper that pulls only the `template/` subdirectory from GitHub at runtime using `degit`. This prevents CLI development dependencies from bloating the user's project.
- **Dependency Isolation:** Relocated the `shadcn` CLI from production dependencies to development dependencies, reducing the installation footprint by hundreds of packages and eliminating nested vulnerabilities (like `hono` and `@modelcontextprotocol/sdk`).

#### 2. Advanced Security Controls
- **Secure Token Store:** Migrated authentication token storage from `localStorage` to a secure in-memory store with `sessionStorage` fallback (cleared on tab close), providing solid protection against Cross-Site Scripting (XSS) attacks.
- **Axios Interceptors:** Added automatic JWT injection to all requests and a global 401 response handler that automatically logs out the user and redirects to the login screen if the token expires.

#### 3. State-of-the-Art UX and Design
- **Glassmorphic Login & Register Pages:** Redesigned both authentication screens with a glowing dark mode background, blur backdrops, and subtle floating animations.
- **Official Social Logins:** Added premium Google, GitHub, and Apple login buttons with official SVG logos and hover/tap micro-animations.
- **Password Strength Meter:** Real-time visual indicator showing password robustness as the user types.

#### 4. Type-Safe Form Validations (Zod)
- Configured Zod validation schemas integrated with React Hook Form, replacing local states and providing animated, accessible field-level error messages.

#### 5. Scaffolding Enhancements
- Project names are now validated against npm rules and protected against directory traversal.
- The CLI automatically detects the running package manager (npm, yarn, pnpm, or bun) and prompts the user before installing dependencies.

---

## Français (FR)

### Fonctionnalités Clés et Améliorations

#### 1. Architecture Monorepo et CLI Léger
- **Nouvelle Structure :** Le projet est désormais organisé sous forme de monorepo. Le template React vit dans `template/` et le code de la CLI réside dans `cli/`.
- **Téléchargement Ciblé :** L'outil CLI `@nosleepman/react-starter` ne télécharge désormais que le sous-dossier `template/` depuis GitHub via `degit`.
- **Isolation des Dépendances :** Déplacement du CLI `shadcn` vers les dépendances de développement, éliminant des centaines de paquets inutiles dans le navigateur et corrigeant les vulnérabilités imbriquées (telles que `hono` et `@modelcontextprotocol/sdk`).

#### 2. Contrôles de Sécurité Avancés
- **Stockage de Jeton Sécurisé :** Migration du stockage du jeton d'authentification de `localStorage` vers un stockage en mémoire vive avec repli sur `sessionStorage` (effacé à la fermeture de l'onglet), bloquant les failles XSS.
- **Intercepteurs Axios :** Injection automatique du JWT sur chaque requête et gestion centralisée des erreurs 401 pour déconnecter automatiquement l'utilisateur en cas de session expirée.

#### 3. Interface Utilisateur & Design Next-Gen
- **Pages Connexion & Inscription Glassmorphic :** Refonte esthétique avec dégradés de couleurs fluides, arrière-plan animé et effets de flou de verre.
- **Connexions Sociales Officielles :** Intégration de boutons de connexion pour Google, GitHub et Apple avec logos vectoriels officiels et micro-animations.
- **Indicateur de Robustesse :** Affichage en temps réel de la force du mot de passe saisi.

#### 4. Validation des Formulaires avec Zod
- Validation stricte des entrées via des schémas Zod intégrés à React Hook Form, avec messages d'erreurs animés et précis par champ.

#### 5. Améliorations de la CLI
- Validation du nom de projet selon les spécifications npm et protection contre la traversée de répertoires.
- Détection automatique du gestionnaire de paquets (npm, yarn, pnpm, bun) et confirmation avant l'installation automatique.
