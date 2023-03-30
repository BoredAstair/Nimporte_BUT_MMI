<?php
include("function.php");
include("request.php");
include("connectBDD.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
$data = json_decode($request_body, true);
$erreur = [];
    $request = 'DELETE FROM follow WHERE user_following = "{$date['follower'}" AND user_followed = "{$date['followed']}";
    $remove = $bdd -> prepare($request);
    encodeJson($remove);
?>