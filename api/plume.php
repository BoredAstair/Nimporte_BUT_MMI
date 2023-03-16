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
    if($uri_segments[$i] == "plume.php"){
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
if($request_method == 'GET' && count($segments_uri) == 0){
    $allPlume = select("*", "plume");
    encodeJson($allPlume);

    $returnPlume = [];
    foreach($allPlume as $plume){
        if(empty($plume["answer_to"])){
            $returnPlume[$plume['id']]['user'] = $plume['user'];
            $returnPlume[$plume['id']]['content'] = $plume['content'];
            $returnPlume[$plume['id']]['hashtag'] = $plume['hashtag'];
            $returnPlume[$plume['id']]['posted_at'] = $plume['posted_at'];
        }
        else{
            $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['user'] = $plume['user'];
            $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['content'] = $plume['content'];
            $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['hashtag'] = $plume['hashtag'];
            $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['posted_at'] = $plume['posted_at'];
        }
    }
    encodeJson($returnPlume);
}
?>