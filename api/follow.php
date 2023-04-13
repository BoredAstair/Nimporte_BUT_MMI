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
    $request = 'INSERT INTO follow(user_following,user_followed,follow_since) VALUES (:follower, :followed, :follow_since)';
    $insert = $bdd -> prepare($request);
    $insert -> execute([
        ":follower" => $data['follower'],
        ":followed" => $data['followed'],
        ":follow_since" => date("Y-m-d H:i:s")
    ]);
    $state["etat"] = "valide";
    encodeJson($state);
?>