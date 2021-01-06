# PROJET NUMERO 7 - OPENCLASSROOMS - PARCOURS DEVELOPPEUR WEB

# GROUPOMANIA - CREER UN RESEAU SOCIAL D'ENTREPRISE

## INSTRUCTIONS 

* Il vous faudra avoir installé sur votre machine:
    * Node.js (et donc npm),
    * MySQL,
    * Git.

- Créer un dossier vide et cloner ce repository à l'intérieur:

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

- Connectez-vous à mysql.

- Dans les settings de votre ordinateur, assurez vous qu'une instance MySQL soit bien active.

- Importez le fichier " initialisationBdd.sql "

```bash
mysql> source (chemin vers le fichier initialisationBdd.sql)
```

Ceci va créer une base de données nommée "groupomania"

## DANS LE DOSSIER BACKEND

- Ouvrez le fichier " .env.initial " : vous devez assigner des valeurs aux 3 variables suivantes:

```bash
DB_USER = 
DB_PASS = 
TKN_SECRET = 
```

- DB_USER: votre nom d'utilisateur pour votre base de données.
- DB_PASS: votre mot de passe pour votre base de données.
- TKN_SECRET = variable de votre choix.

- Renommer ce dossier " .env " à la place de " .env.initial ".

- Ouvrez un troisième terminal (assurez vous de bien être dans le dossier backend)

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

- Pour avoir le privilège d'Adminstrateur, revenez dans votre terminal connecté à MySQL, et importez le fichier setAdmin.sql. 

```bash
mysql> source (chemin vers le fichier setAdmin.sql)
```

Cela attribuera au premier utilisateur créé (User id=1), les privilèges d'administration (isAdmin=1).

Recharger la page de votre naviguateur pour voir votre compte passer de simple utilisateur à adminstrateur.

Le site vous permet de partager des images et de les commenter, les vôtres et celles des autres. Vous pouvez supprimer votre compte. L'administrateur peut supprimer les comptes de n'importe qui, ainsi que les commentaires et les images.

Bonne naviguation!
