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
    if($uri_segments[$i] == "sendPlume.php"){
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
if($request_method == "POST" && count($segments_uri)==0){
    $request = 'INSERT INTO plume(user,content,hashtag,posted_at) VALUES (:user, :content, :hashtag, :posted_at)';
    $insert = $bdd -> prepare($request);
    $insert -> execute([
        ":user" => $_POST['user'],
        ":content" => $_POST['content'],
        ":hashtag" => $_POST['hashtag'],
        ":posted_at" => $_POST['posted_at']
    ]);
    $state["etat"] = "valide";
    encodeJson($state);
}
?>