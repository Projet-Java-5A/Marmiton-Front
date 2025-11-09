# FrontSkeleton

## Les installations nécessaire

- Node 22

## Pour lancer le projet sans docker principal

Dans le fichier `Marmiton\Marmiton-Front\src\environments\environment.ts` changer le `api.url` en décomentant les lignes indiqués.

Lancer dans le terminal :

```bash
npm i
npm run start
```

et se rendre sur `http://localhost:4200/`

## Connexion

### Guest

On peut consulter les recettes.

### User

On peut consulter et créer des recettes.
On peut modifier et supprimer ses recettes.

### Admnin

On peut consulter, créer et supprimer des recettes
On a accès à la page admin où on peut valider les recettes en attente
Pour se connecter en tant que Admin, utilisez :

```
email : arthur@arthur
mdp   : arthur
```
