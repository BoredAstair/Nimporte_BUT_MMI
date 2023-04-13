# N'importe_BUT_MMI
Owltree | BOUTRY Lucas, ESTAYO Karl, GERMAIN Tessa, SAINTEMARIE Noémie, VERGNAUD Amélie
Projet de Seconde année de BUT MMI, réalisation par groupe d'un site qui reprend le concept de Twitter

Fonctionnalités :
 - S'inscrire / Se connecter
 - Envoyer une plume (tweet)
 - Commenter une plume
 - Liker une plume
 - Preening (Retweeter)
 - Enregistrer une plume
 - Rechercher un utilisateur (uniquement sur la barre de recherche de l'accueil)
 - Accéder au profil des autres utilisateurs
 - follow / unfollow
 - Modification de profil : photo de profil, pseudo, bannière, biographie
 - Changement de la couleur principale
 - Supprimer le compte
 - Se déconnecter

Prévues mais non achevées :
 - Ajouter une image à une plume
 - Changement de mot de passe
 - Responsive
 - Recherche par mot clé
 - Recherche par hashtag
 - Supprimer un tweet
 - Thème clair
 - Enregistrements pas dynamique (lorsque l'on enlève une plume des enregistrés, et quand on envoie une plume)
 - Partager une plume

Pour faire fonctionner l'API :
Prendre le dossier api et le placer dans un localhost.
Ouvrir les fichiers .js présents dans le dossier js et modifier la variable urlCourante à la ligne 1 de chaque fichier.
Cette variable doit contenir l'URL du localhost à la racine du dossier contenant l'api

Pour compiler le scss :
La page de connexion : npm run connexion
L'index : npm run start
La page d'erreur 404 : npm run 404
