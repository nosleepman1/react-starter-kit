# Contributing Guidelines

Thank you for your interest in contributing to React Starter Kit. This document outlines the process for proposing changes, submitting bug reports, and code contributions.

As an open-source project, we value contributions that make this template cleaner, more secure, and more accessible for developers worldwide.

## Code of Conduct

We expect all contributors to maintain professional, polite, and constructive communication at all times.

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report, please check the existing issues on GitHub to verify if the issue has already been reported. If not, open a new issue and include:
- A clear, descriptive title.
- Steps to reproduce the issue.
- Expected vs. actual behavior.
- Details about your environment (Node.js version, OS, browser, package manager).

### Proposing Enhancements

If you want to suggest new features or improvements:
- Open an issue outlining the proposed feature and why it would benefit the project.
- Discuss the design with the maintainers before starting work to avoid rejected Pull Requests.

### Pull Requests

1. Fork the repository and create your branch from `main`.
2. Install dependencies in the root or the template folder depending on your work.
3. Make your modifications.
4. Ensure the codebase passes all linting and compilation checks:
   - Within `template/`: `npm run lint` and `npx tsc -b`
   - Within `cli/`: Test locally using `node bin/cli.js`
5. Commit your changes using clean, descriptive commit messages.
6. Submit a Pull Request targeting the `main` branch.

## Directory Structure Rules

When proposing changes, adhere strictly to our directory boundaries:
- Do not add Node.js server dependencies to `template/package.json` under `dependencies`. Keep development tools in `devDependencies`.
- Keep the `cli/` folder independent of the `template/` files. The CLI pulls from the GitHub repository at run time; it should not package the template files locally anymore.
- Place reusable UI components in `template/src/components/ui/` and layouts in `template/src/components/layouts/`.

## Coding Standards

- **TypeScript:** Use strict type checking. Avoid using the `any` type.
- **ESLint:** Run `npm run lint` in the template folder. Warnings should be minimized, and errors are blocking.
- **Styling:** Follow the established tailwindcss configuration and OKLCH color palettes defined in `index.css`.
- **Security:** Do not use `localStorage` for sensitive tokens. All token reads/writes must use the abstraction provided in `src/lib/tokenStore.ts`.
