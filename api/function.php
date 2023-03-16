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
function verifToken(){ //Vérifie si un token existe chez un utilisateur et si ce dernier est encore valable
    include("request.php");
    $userID = null;
    $isAuth = false;
    foreach(getallheaders() as $name => $value){
        if($name == "autorization"){
            $res = selectCondition("*", "session", "token = {$value}");
            if(sizeof($res) == 0){
                http_response_code(401);
                echo "the token is not valid";
            } else {
                $isAuth = true;
                $userID = $res[0]['userID'];
            }
        }
    }
}
?>