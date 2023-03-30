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
    if($uri_segments[$i] == "users.php"){
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
if($request_method == "GET" && count($segments_uri)==0){
    $requeteUser = 'SELECT * FROM user';
    $selectUser = $bdd -> prepare($requeteUser);
    $selectUser -> execute();
    $users = $selectUser -> fetchAll(PDO::FETCH_ASSOC);
    $nbUsed = [];
    $userSend = [];
    $i=0;
    while(count($nbUsed)!=count($users)){
        $random = random_int(0, count($users)-1);
        if(!in_array($random, $nbUsed)){
            array_push($nbUsed, $random);
            array_push($userSend, $users[$random]);
        }
        $i++;
    }
    encodeJson($userSend);
    // debug($users);
}
?>