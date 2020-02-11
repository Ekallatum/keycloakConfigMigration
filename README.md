# Keycloak configuration migration project

Ce projet à pour objectif de permettre la migration d'une configuration d'un royaume keycloak pour un nouveau royaume

## Installation (obligatoire)
```bash
npm i
```

## Configuration (non obligatoire)
Modifier le fichier config.json à votre convenance
```json
{
    "originalFilePath": "./realm-to-modify.json",
    "defaultDestionationFilePath": "./dist/new-real-to-import.json",
    "defaultRealId": "default",
    "defaultRealmName": "default"
}
```

## Lancer la modification (obligatoire)
```bash
make
```

## Récupérer le fichier générer
Le fichier est à récupérer dans "defaultDestionationFilePath" configuré plus haut