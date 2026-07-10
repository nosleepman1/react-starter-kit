# React Starter Kit

A professional scaffolding CLI and monorepo structure to create high-performance, secure, and modern React client-side applications with built-in authentication, routing, and a state-of-the-art UI system.

![React Starter Kit Banner](react_starter_banner.png)

## Overview

React Starter Kit is designed for developers who want to skip the repetitive setup phase and jump straight into writing business logic. It provides a production-ready client architecture with pre-configured authentication, routing security, form validation, and modern styles.

The CLI package `@nosleepman/react-starter` has achieved over 1000 downloads, proving its reliability and ease of use in bootstrap workflows.

## Features

- React 19 and TypeScript for complete type safety.
- Vite as the build tool for ultra-fast compilation.
- Tailwind CSS v4 for utility-first styling.
- Pre-configured shadcn/ui components.
- React Router DOM v7 for client-side routing.
- Complete Authentication flow (login, registration, secure state).
- Axios instance configured with request and response interceptors.
- Zod validation integrated with React Hook Form for type-safe inputs.
- Clean and secure in-memory JWT token store with sessionStorage fallback.
- Full dark and light mode support via next-themes.

## Getting Started

### Using the CLI

To bootstrap a new project immediately, run the following command in your terminal:

```bash
npx @nosleepman/react-starter my-app
```

The CLI will prompt you to choose your preferred package manager (npm, yarn, pnpm, or bun), fetch the latest template from the repository, configure the project name, and automatically setup environment variables.

### Manual Setup (Git Clone)

If you prefer to clone the repository manually:

1. Clone the repository:
   ```bash
   git clone https://github.com/nosleepman1/react-starter-kit.git my-app
   ```
2. Navigate to the template directory:
   ```bash
   cd my-app/template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Repository Structure

The repository is structured as a clean monorepo:

- **cli/**: The lightweight scaffolding CLI tool published to npm under `@nosleepman/react-starter`.
- **template/**: The core React application template containing the source code, components, and configs.

## Documentation

For detailed information on the design patterns, security rules, and architecture choices, please refer to the dedicated documents:

- [Architecture Guide](ARCHITECTURE.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [French Version of README](README.fr.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
