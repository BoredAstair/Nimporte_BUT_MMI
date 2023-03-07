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
    setcookie("tokenCookie", $random, 86400); //Stocke le token dans les cookies du navigateur de l'utilisateur avec une durée de vie de 1 jours
    return $random;
}
/*function getSavedPlume($user){
    $req = 
}*/
function verifToken(){ //Vérifie si un token existe chez un utilisateur et si ce dernier est encore valable
    include("request.php");
    if (isset($_COOKIE['tokenCookie'])){ //Verif presence token COOKIES
        $response = selectCondition("token,token_date", "user", "user.token = '{$_COOKIE['tokenCookie']}'"); 
        if ($_COOKIE['tokenCookie'] == $response[0]["token"]){ //Verif correspondance token BDD et token COOKIES
            if (strtotime($response[0]['token_date']) < strtotime("-2 day")){
            header("Location: ../index.html");
            die();
            }
        } else {
            header("Location: ../index.html");
            die();
        }
    } else {
        header("Location: ../index.html");
        die(); 
    }
}
?>