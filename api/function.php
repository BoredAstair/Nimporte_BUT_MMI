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
    $random = uniqid();
    $json_data = json_encode($random);
    return $json_data;
}
if(!function_exists('debugConsole')) {
    function debugConsole($data) { 
        if (is_array($data)) $output = "<script>console.log('Debug Objects: ".implode(',', $data)."');</script>"; 
        else $output = "<script>console.log('Debug Objects: ".$data."');</script>"; echo $output; 
    }
}
