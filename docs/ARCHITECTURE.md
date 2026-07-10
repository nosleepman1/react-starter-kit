# Technical Architecture

This document describes the architectural decisions, design patterns, and security constraints implemented in React Starter Kit.

## Scaffolding Architecture (Monorepo)

To preserve a clean separation of concerns, the repository is split into two distinct parts:

1. **template/**: This contains the React application. Keeping it inside a standalone folder allows git-cloners to access the project directly, and lets the template run verification tools (ESLint, TypeScript) in isolation.
2. **cli/**: A lightweight CLI published to npm as `@nosleepman/react-starter`. It has zero knowledge of the template files locally. At runtime, it uses `degit` to pull the `template` subdirectory directly from the GitHub repository.

This structure eliminates the risk of publishing local dev dependencies (like `hono` or `@modelcontextprotocol/sdk` pulled in by development tools) into the production React client bundle.

## Core Stack & Justifications

### React 19 & TypeScript
Using the latest version of React ensures long-term support and native support for new compiler features. TypeScript is configured in strict mode to detect type errors at compile time, eliminating runtime type crashes.

### Vite
Vite is used as the bundler instead of Webpack. It leverages native ES modules in development, enabling nearly instantaneous hot module replacement (HMR) and optimized Rollup builds for production.

### Tailwind CSS v4 & OKLCH Color Palette
Tailwind CSS v4 introduces CSS-first configuration. Color definitions use the OKLCH color space, which provides uniform perceived lightness, resulting in smoother gradients and consistent contrast ratios in both light and dark modes.

### Zod & React Hook Form
Inputs are validated on the client side using Zod schemas before being sent to the server. Integrating Zod with React Hook Form prevents manual form state tracking and provides automatic, accessible, and animated field-level error messages.

## Security Controls

### Token Management (XSS Protection)
Common templates store JWT tokens in `localStorage`. This makes applications highly vulnerable to Cross-Site Scripting (XSS) attacks, as any script running on the page can access `localStorage` and steal the token.

To resolve this:
- Tokens are stored in a dedicated JavaScript module (`src/lib/tokenStore.ts`) inside an in-memory private variable.
- For short-term tab persistence, the token is written to `sessionStorage` (which is isolated and cleared automatically when the tab is closed) instead of `localStorage`.
- In production, we recommend configuring the backend API to return authentication tokens using HttpOnly cookies, rendering them entirely inaccessible to JavaScript.

### Network Layer & Interceptors
The Axios instance (`src/api/api.tsx`) automatically handles:
- Authorization header injection from `tokenStore` dynamically on each request.
- Global 401 response handling. If a request returns a 401 status code (Unauthorized), the interceptor automatically clears the session and redirects the user to the login screen.
- Timeout protection set to 15 seconds to prevent hung HTTP requests.

## State Management & Client Caching

### AuthContext
The AuthContext manages the current user state (`user`, `isAuthenticated`, `loading`). It synchronizes with the `tokenStore` on startup to recover user details from the backend `/auth/me` endpoint.

### React Query (TanStack Query)
For data fetching that goes beyond authentication, TanStack Query is initialized at the root of the app. It provides built-in query caching, automatic retries on failure, background refetching, and state synchronization across components.
