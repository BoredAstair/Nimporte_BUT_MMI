<?php
//TOUTES LES FONCTIONS UTILITAIRES TRIE PAR ORDRE ALPHABETIQUE

function debug($tableau){ // affichage des tableaux pour débuger
    echo '<pre>';
    print_r($tableau);
    echo '</pre>';
}
function encodeJson($tableau){ // encode un tableau en format JSON
    $json_data = json_encode($tableau);
    header('Content-Type: application/json');
    echo $json_data;                 
}
function generateToken($longueur){ //génère un token
    $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $longueurMax = strlen($caracteres);
    $random ='';
    for($i=0; $i<$longueur; $i++){
        $random .= $caracteres[rand(0, $longueurMax - 1)];
    }
    return $random;
}
?>