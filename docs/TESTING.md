# Testing Guidelines

This document describes how to test the React Starter Kit monorepo components locally from A to Z to guarantee stability before publishing changes.

## Testing the CLI Locally

To test the scaffolding CLI tool without publishing it to npm:

1. Navigate to the CLI directory:
   ```bash
   cd cli
   ```
2. Link the package locally:
   ```bash
   npm link
   ```
   This creates a global symlink for `@nosleepman/react-starter` on your system.
3. Test scaffolding a new project in a temporary directory:
   ```bash
   cd /path/to/temp/directory
   react-starter my-test-app
   ```
   Alternatively, run the script directly using Node:
   ```bash
   node /path/to/react-starter-kit/cli/bin/cli.js my-test-app
   ```
4. Verify that:
   - The project is created successfully.
   - The CLI prompts you to choose the package manager and asks if you want to install dependencies.
   - The `template/` files are successfully downloaded and copied.
   - Files like `cli/` and `.git` are removed.
   - `.env` is created.
   - `package.json` has the name `my-test-app`.
5. Unlink the package when testing is complete:
   ```bash
   cd /path/to/react-starter-kit/cli
   npm unlink
   ```

## Testing the React Template Locally

To test the React template application:

1. Navigate to the template directory:
   ```bash
   cd template
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Perform manual quality checks on the browser (typically at http://localhost:5173):
   - Access the login page.
   - Verify input fields show instant validation errors on blur or submit if empty/invalid.
   - Try logging in with mock credentials and observe redirect behavior.
   - Check the dark/light mode toggle.
5. Verify code quality checks:
   - Run ESLint check:
     ```bash
     npm run lint
     ```
     Ensure it returns 0 errors.
   - Run TypeScript compilation check:
     ```bash
     npx tsc -b
     ```
     Ensure it compiles with 0 errors.
