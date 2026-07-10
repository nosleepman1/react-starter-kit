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
