# esgi-myges-api

API pour la gestion des utilisateurs, rôles, permissions, objets et processus éducatif dans le cadre d’un projet académique ESGI.

## Description

Ce projet fournit une API REST en Node.js avec TypeScript et MongoDB (via Mongoose). Il prend en charge la gestion des rôles (admin, intervenant, étudiant), des objets, des permissions et des données pédagogiques.

## Fonctionnalités principales

- Authentification et autorisation des utilisateurs
- CRUD pour utilisateurs, rôles, permissions, objets
- Relations entre étudiants, intervenants et objets
- Hashage des mots de passe (bcrypt)
- Initialisation de données de test

## Installation

1) Clonez le dépôt :
```sh
  git clone https://github.com/NemoZon/esgi-myges-api.git
  cd esgi-myges-api
```

2) Installez les dépendances :
```sh
  npm i
```

3) Créez un fichier `.env`
```
  PORT=3000
  NODE_ENV=development
  JWT_ACCESS_SECRET=your_jwt_access_secret
  JWT_REFRESH_SECRET=your_jwt_refresh_secret
  MODEL=dev
```

4) Lancement
```sh
  npm run dev
```

## Structure du projet
 - src/models — Schémas Mongoose et interfaces
 - src/services — Logique métier et accès aux modèles
 - src/controllers — Contrôleurs pour les routes HTTP
 - src/routes — Définition des routes API
 - src/data/mocks — Initialisation des données de test
