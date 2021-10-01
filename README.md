# 🚀 Création d'un player JavaScript

## Sommaire
1. [**Initialisation du projet à l'aide de Node.JS**](#initialisation-du-projet)
2. [**API SoundCloud**](#api-soundcloud)

## Initialisation du projet

Première étape : installation des dépendances de développements à l'aide de `npm install`.  
Ensuite, deux commandes possibles : 
1. `npm run dev` permet d'exécuter webpack serveur et de lancer le rafraîchissement dynamique de l'onglet (Hot Module Replacement)
2. `npm run build` permet de produire l'ensemble des fichiers de production

## API SoundCloud

=> Lien vers le [**bac à sable SoundCloud**](https://developers.soundcloud.com/docs/api/explorer/open-api)  
=> Lien vers la documentation de l'[**API**](https://developers.soundcloud.com/docs/api/guide)

Pour le fonctionnement de ce player nous utilisons l'API SoundCloud et nous aurons donc besoin de plusieurs routes différentes.  
La route `​/oauth2​/token` permet de récupérer le token d'authentification qui permettra ensuite de récupérer les informations autour 
des audios.  
La route `​/tracks​/{track_id}` permet de récupérer l'ensemble des infos d'un audio dont on connaît l'ID.  
La route `​/tracks​/{track_id}​/streams` permet d'obtenir finalement l'ensemble des URLs de streaming de cet audio.  

Ce que l'on va chercher à obtenir pour notre audio de test de ce player JavaScript : 
1. `title` le titre de l'audio
2. `duration` la durée de l'audio 
3. `artwork_url` la vignette de l'audio
4. `genre` le genre de l'audio (pour tagger l'audio)
5. `http_mp3_128_url` l'URL de stream de l'audio qui servira de source à notre élément `<audio>`  

> ### 💡 Guidelines SASS en français
> Voici les guidelines à suivre pour [**SASS**](https://sass-guidelin.es/fr/).