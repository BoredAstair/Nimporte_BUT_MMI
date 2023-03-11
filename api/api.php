<?php
include("function.php");
include("request.php");
include("connectBDD.php");

header("Access-Control-Allow-Origin: *");

$request_method = $_SERVER['REQUEST_METHOD']; //récup le verbe d'action
$request_uri = $_SERVER['REQUEST_URI']; //récup l'uri
$uri_segments = explode('/', $request_uri); //séparé l'uri --> bien pensé à le var_dump au début de la construction de l'API pour savoir d'où il part
for($i=0; $i<count($uri_segments); $i++){
    if($uri_segments[$i] == "api.php"){
        $uri = $i;
    }
}
$segments_uri = [];
for($i=$uri+1; $i<count($uri_segments); $i++){
    array_push($segments_uri, $uri_segments[$i]); //récupère l'uri à partir du fichier api.php pour limiter les segments
}
$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex

if(count($segments_uri) == 2){
    if($segments_uri[0] == "get" && $segments_uri[1] == "plume"){ // récup toutes les plumes
        $allPlume = select("*", "plume");
        encodeJson($allPlume);
    }
    else if ($segments_uri[0] == "get" && explode("?",$segments_uri[1])[0] == "data"){ // récup toutes les plumes sauvegardé par un utilisateur)
        $dataUser = selectCondition("username,pseudo,mail,pp,banner,bio", "user", "username = '{$_GET['user']}'");
        encodeJson($dataUser);
    }
    else{
        echo "erreur 404";
    }
}
if(count($segments_uri) == 3){
    if($segments_uri[0] == "get" && $segments_uri[1] == "save" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur
        $savedPlume = selectConditionJoin("*","save_plume","plume","save_plume.user = '{$segments_uri[2]}'","RIGHT","save_plume.plume_id","plume.id");
        encodeJson($savedPlume);
    }
    else if ($segments_uri[0] == "get" && $segments_uri[1] == "like" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur)
        $likedPlume = selectConditionJoin("*","like_plume","plume","like_plume.user = '{$segments_uri[2]}'","RIGHT","like_plume.plume_id","plume.id");
        encodeJson($likedPlume);
    }
    else if ($segments_uri[0] == "get" && $segments_uri[1] == "plume" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur)
        $plumeUser = selectCondition("*","plume","plume.user = '{$segments_uri[2]}'");
        encodeJson($plumeUser);
    }
    else{
        echo "erreur 404";
    }
}
?>