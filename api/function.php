<?php
//TOUTES LES FONCTIONS UTILITAIRES TRIE PAR ORDRE ALPHABETIQUE

function connectBDD(){ //connexion à la base de données
    try{
        $bdd = new PDO('mysql:host=localhost;dbname=twitter;charset=utf8', 'root', '');
    } 
    catch (Exception $e){
        die('Erreur de connexion: '.$e->getMessage());
    }
}
function debug($tableau){ // affichage des tableaux pour débuger
    echo '<pre>';
    print_r($tableau);
    echo '</pre>';
}
?>