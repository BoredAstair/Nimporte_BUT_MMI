<?php
include("function.php");
include("request.php");
include("connectBDD.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request_method = $_SERVER['REQUEST_METHOD']; //récup le verbe d'action
$request_uri = $_SERVER['REQUEST_URI']; //récup l'uri

$uri_segments = explode('/', $request_uri); //séparé l'uri --> bien pensé à le var_dump au début de la construction de l'API pour savoir d'où il part
for($i=0; $i<count($uri_segments); $i++){
    if($uri_segments[$i] == "countProfile.php"){
        $uri = $i;
    }
}
$segments_uri = [];
for($i=$uri+1; $i<count($uri_segments); $i++){
    array_push($segments_uri, $uri_segments[$i]); //récupère l'uri à partir du fichier api.php pour limiter les segments
}

$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
$data = json_decode($request_body, true);
$erreur = [];

if($request_method=="POST" && count($segments_uri)==1 && $segments_uri[0]=="plume"){
    if($data['user']){
        $requestPlume = 'SELECT *, COUNT(id) as nb_plumes FROM plume WHERE user=:user';
        $selectPlume = $bdd -> prepare($requestPlume);
        $selectPlume -> execute([
            ":user"=> $data['user']
        ]);
        $plumes = $selectPlume -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($plumes);
    }
}
else if($request_method=="POST" && count($segments_uri)==1 && $segments_uri[0]=="follower"){
    if($data['user']){
        $requestFollower = 'SELECT *, COUNT(follow_since) as nb_follower FROM follow WHERE user_following=:user';
        $selectFollower = $bdd -> prepare($requestFollower);
        $selectFollower -> execute([
            ":user"=> $data['user']
        ]);
        $followers = $selectFollower -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($followers);
    }
}
else if($request_method=="POST" && count($segments_uri)==1 && $segments_uri[0]=="followed"){
    if($data['user']){
        $requestFollowed = 'SELECT *, COUNT(follow_since) as nb_followed FROM follow WHERE user_followed=:user';
        $selectFollowed = $bdd -> prepare($requestFollowed);
        $selectFollowed -> execute([
            ":user"=> $data['user']
        ]);
        $followeds = $selectFollowed -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($followeds);
    }
}
?>