# Directives de Contribution

Merci de l'intérêt que vous portez au projet React Starter Kit. Ce document détaille le processus pour proposer des modifications, signaler des bugs et soumettre des contributions au code.

En tant que projet open-source, nous apprécions toutes les contributions visant à rendre ce template plus propre, plus sécurisé et plus accessible.

## Code de Conduite

Nous attendons de tous les contributeurs qu'ils maintiennent en tout temps une communication professionnelle, polie et constructive.

## Comment Contribuer ?

### Signaler des Bugs

Avant de soumettre un rapport de bug, veuillez vérifier les tickets (issues) existants sur GitHub pour vous assurer que le problème n'a pas déjà été signalé. Si ce n'est pas le cas, ouvrez un nouveau ticket et incluez :
- Un titre clair et descriptif.
- Les étapes pour reproduire le problème.
- Le comportement attendu et le comportement réel observé.
- Les détails de votre environnement (version de Node.js, OS, navigateur, gestionnaire de paquets).

### Proposer des Améliorations

Si vous souhaitez suggérer de nouvelles fonctionnalités ou des améliorations :
- Ouvrez un ticket décrivant la fonctionnalité proposée et son intérêt pour le projet.
- Discutez-en avec les mainteneurs avant de commencer le développement pour éviter que votre Pull Request ne soit rejetée.

### Pull Requests (Demandes de Fusion)

1. Forkez le dépôt et créez votre branche à partir de `main`.
2. Installez les dépendances à la racine ou dans le dossier du template selon vos modifications.
3. Appliquez vos modifications de code.
4. Assurez-vous que le projet passe tous les tests de validation :
   - Dans `template/` : `npm run lint` et `npx tsc -b`
   - Dans `cli/` : Testez localement avec `node bin/cli.js`
5. Créez des messages de commit clairs et descriptifs.
6. Soumettez votre Pull Request en ciblant la branche `main`.

## Règles de Structure des Dossiers

Lorsque vous proposez des modifications, respectez scrupuleusement l'organisation de nos dossiers :
- N'ajoutez pas de dépendances serveur Node.js dans `template/package.json` sous `dependencies`. Les outils de développement doivent être placés dans `devDependencies`.
- Le dossier `cli/` doit rester indépendant des fichiers du template. Le CLI télécharge le projet à la volée depuis GitHub ; il ne doit plus embarquer le template localement.
- Placez les composants UI réutilisables dans `template/src/components/ui/` et les mises en page dans `template/src/components/layouts/`.

## Standards de Codage

- **TypeScript :** Utilisez le typage strict. Évitez l'utilisation du type `any`.
- **ESLint :** Lancez `npm run lint` dans le dossier du template. Les avertissements doivent être minimisés et les erreurs sont bloquantes.
- **Design :** Suivez la configuration Tailwind CSS et la palette de couleurs OKLCH définies dans `index.css`.
- **Sécurité :** N'utilisez pas `localStorage` pour stocker des jetons sensibles. Tout accès aux tokens doit passer par l'abstraction fournie dans `src/lib/tokenStore.ts`.
