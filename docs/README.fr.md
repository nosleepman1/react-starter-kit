# React Starter Kit

Un CLI de génération de projet professionnel et une structure monorepo pour créer des applications React côté client performantes, sécurisées et modernes, avec système d'authentification, routage et interface utilisateur pré-configurés.

![React Starter Kit Banner](react_starter_banner.png)

## Présentation

React Starter Kit s'adresse aux développeurs qui souhaitent éviter la phase répétitive de configuration initiale pour se concentrer immédiatement sur le développement des fonctionnalités. Il fournit une architecture client prête pour la production avec authentification pré-configurée, routage sécurisé, validation de formulaires et styles modernes.

Le paquet CLI `@nosleepman/react-starter` a dépassé les 1000 téléchargements, démontrant sa fiabilité et sa simplicité d'intégration dans les flux de travail de démarrage.

## Fonctionnalités

- React 19 et TypeScript pour une sécurité de type complète.
- Vite comme outil de build pour une compilation ultra-rapide.
- Tailwind CSS v4 pour le stylage utilitaire.
- Composants shadcn/ui pré-installés et configurés.
- React Router DOM v7 pour le routage côté client.
- Flux d'authentification complet (connexion, inscription, gestion d'état sécurisée).
- Instance Axios configurée avec intercepteurs de requête et de réponse.
- Validation Zod intégrée avec React Hook Form pour des formulaires typés.
- Magasin de jetons JWT sécurisé en mémoire avec repli sur sessionStorage.
- Support complet du mode sombre et clair via next-themes.

## Démarrage

### Utilisation de la CLI

Pour initialiser un nouveau projet immédiatement, lancez la commande suivante dans votre terminal :

```bash
npx @nosleepman/react-starter mon-app
```

Le CLI vous invitera à choisir votre gestionnaire de paquets préféré (npm, yarn, pnpm ou bun), récupérera le dernier template du dépôt, configurera le nom de votre projet et configurera automatiquement les variables d'environnement.

### Configuration Manuelle (Git Clone)

Si vous préférez cloner le dépôt manuellement :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/nosleepman1/react-starter-kit.git mon-app
   ```
2. Accédez au dossier du template :
   ```bash
   cd mon-app/template
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Copiez le fichier d'environnement modèle :
   ```bash
   cp .env.example .env
   ```
5. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## Structure du Dépôt

Le dépôt est structuré comme un monorepo propre :

- **cli/** : L'outil CLI de génération léger publié sur npm sous le nom `@nosleepman/react-starter`.
- **template/** : Le template de l'application React contenant le code source, les composants et les configurations.

## Documentation

Pour plus d'informations sur les modèles de conception, les règles de sécurité et les choix d'architecture, veuillez vous référer aux guides dédiés :

- [Guide d'Architecture](ARCHITECTURE.fr.md)
- [Directives de Contribution](CONTRIBUTING.fr.md)
- [Version anglaise du README](README.md)

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
