#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import pc from 'picocolors';
import degit from 'degit';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Regex pour valider un nom de package npm valide
const VALID_PACKAGE_NAME_REGEX = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function validateProjectName(name) {
  if (!name || name.trim() === '') {
    return 'Le nom du projet ne peut pas être vide.';
  }
  if (!VALID_PACKAGE_NAME_REGEX.test(name)) {
    return 'Le nom du projet doit être un nom de package npm valide (minuscules, chiffres, tirets).';
  }
  // Protection contre le path traversal
  if (name.includes('..') || name.includes('/') || name.includes('\\')) {
    return 'Le nom du projet ne doit pas contenir de chemins relatifs.';
  }
  return true;
}

// Détecte le package manager utilisé pour lancer la commande
function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith('pnpm')) return 'pnpm';
  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('bun')) return 'bun';
  return 'npm';
}

async function run() {
  console.log(pc.bold(pc.magenta('\n Bienvenue dans React Starter Kit !\n')));

  // Récupérer le nom du projet en argument ou via prompt
  let projectName = process.argv[2];
  
  if (projectName) {
    const validationResult = validateProjectName(projectName);
    if (validationResult !== true) {
      console.error(pc.red(` Erreur: ${validationResult}`));
      process.exit(1);
    }
  } else {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Quel est le nom de votre projet ?',
        default: 'my-react-app',
        validate: validateProjectName
      }
    ]);
    projectName = answers.name;
  }

  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Le dossier ${pc.cyan(projectName)} existe déjà. Souhaitez-vous l'écraser ?`,
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(pc.yellow('Opération annulée.'));
      process.exit(0);
    }
    
    console.log(pc.yellow(`Suppression de ${projectName}...`));
    await fs.remove(targetDir);
  }

  // Choix du gestionnaire de paquets
  const detectedManager = detectPackageManager();
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Quel gestionnaire de paquets souhaitez-vous utiliser ?',
      choices: ['npm', 'yarn', 'pnpm', 'bun'],
      default: detectedManager
    }
  ]);

  console.log(pc.cyan(`\nClonage du template depuis GitHub (nosleepman1/react-starter-kit)...`));

  try {
    const cloneProgress = degit('nosleepman1/react-starter-kit/template#gitignore', {
      cache: false,
      force: true
    });

    await cloneProgress.clone(targetDir);

    // Nettoyage : supprimer les dossiers CLI internes pour ne garder que le projet React propre
    const cleanPaths = [
      path.join(targetDir, 'create-app'),
      path.join(targetDir, 'cli'),
      path.join(targetDir, '.git'),
      path.join(targetDir, '.github')
    ];

    for (const cleanPath of cleanPaths) {
      if (fs.existsSync(cleanPath)) {
        await fs.remove(cleanPath);
      }
    }

    // Renommer le projet dans package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkg = await fs.readJson(packageJsonPath);
      pkg.name = projectName;
      pkg.version = '0.1.0';
      // S'assurer que le projet est marqué comme privé par défaut
      pkg.private = true;
      await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
    }

    // Créer le fichier .env
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    if (fs.existsSync(envExamplePath)) {
      await fs.copy(envExamplePath, envPath);
    } else {
      await fs.writeFile(envPath, 'VITE_API_URL=http://localhost:8000/api/v1\n');
    }

    console.log(pc.green(`✔ Projet créé avec succès dans ${pc.bold(targetDir)}`));

    // Proposer l'installation automatique des dépendances
    const { install } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'install',
        message: 'Souhaitez-vous installer les dépendances maintenant ?',
        default: true
      }
    ]);

    if (install) {
      console.log(pc.cyan('\nInstallation des dépendances...'));
      process.chdir(targetDir);
      
      let installCommand = `${packageManager} install`;
      if (packageManager === 'yarn') installCommand = 'yarn';

      try {
        execSync(installCommand, { stdio: 'inherit' });
        console.log(pc.green('\n✔ Dépendances installées avec succès !'));
      } catch (err) {
        console.error(pc.red(` Erreur lors de l'installation des dépendances. Vous devrez les installer manuellement.`));
      }
    }

    console.log('\n' + pc.bold(pc.magenta('===============================================================================')));
    console.log(pc.bold('Prise en main rapide :'));
    console.log(`  1. cd ${pc.cyan(projectName)}`);
    if (!install) {
      console.log(`  2. ${pc.cyan(`${packageManager} install`)}`);
    }
    console.log(`  3. Configurez ${pc.cyan('.env')} avec vos variables d'environnement`);
    
    let runDevCommand = 'npm run dev';
    if (packageManager === 'pnpm') runDevCommand = 'pnpm dev';
    else if (packageManager === 'yarn') runDevCommand = 'yarn dev';
    else if (packageManager === 'bun') runDevCommand = 'bun dev';

    console.log(`  4. Lancez le projet : ${pc.cyan(runDevCommand)}`);
    console.log(pc.bold(pc.magenta('===============================================================================\n')));

  } catch (err) {
    console.error(pc.red('\n Erreur lors de la création du projet :'), err);
    process.exit(1);
  }
}

run();
