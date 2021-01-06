# PROJET NUMERO 7 - OPENCLASSROOMS - PARCOURS DEVELOPPEUR WEB

# GROUPOMANIA - CREER UN RESEAU SOCIAL D'ENTREPRISE

## INSTRUCTIONS 

* Il vous faudra avoir installé sur votre machine:
    * Node.js (et donc npm),
    * MySQL,
    * GIT.

- Créer un dossier vide.
- Ouvrez un terminal et initalisez le dossier avec git avec la commande ci-dessous:

```bash
git init
```
- cloner ce repository:

```bash
git clone https://github.com/RafaRemote/P7-Groupomania.git
```

- Vous verrez deux dossiers distincts: Frontend et Backend.

## DANS LE DOSSIER FRONTEND

- Ouvrez un premier terminal et faites:


```bash 
npm install
```

- puis une fois l'installation terminée:

```bash
npm run serve
```

Vous aurez un message similaire à celui-ci :

```bash
App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.109:8080/
  ```

## MySQL

- Ouvrez un deuxième terminal.

- Connectez vous à vous à mysql.

- Dans les settings de votre ordinateur, assurez vous qu'une instance MySQL soit bien active.

- Importez le fichier " query sql "

```bash
mysql> source (chemin vers le fichier query.sql)
```

Ceci va créer une base de données nommée "groupomania"


## DANS LE DOSSIER BACKEND

- Ouvrez le fichier " .env.initial " : indiquer votre mot de passe MySQL ainsi qu'une valeur de votre choix pour la variable TKN_SECRET.

- Ouvrez un deuxième terminal.

- Sauvegarder et renommer ce dossier " .env " à la place de " .env.initial ".

- Puis faites:

```bash
npm install
```

- puis une fois l'installation terminée:

```bash
node server
```

## DANS LE NAVIGATEUR

- Ouvrez votre navigateur à l'adresse: http://localhost:8080/

- Vous voyez l'écran de connexion à l'application. Allez dans la rubrique INSCRIPTION, inscrivez l'utilisateur de votre choix en suivant les instructions, puis connectez-vous.

- Pour avoir le privilège d'Adminstrateur, revenez dans voter terminal connecté à MySQL, et importez le fichier query2.sql. Cela attribuera au premier utilisateur crêê (User id=1), les privilèges d'administration (isAdmin=1).

Bonne naviguation!




