<?php
include('connectBDD.php');
include('function.php');
include('request.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
$data = json_decode($request_body, true);

foreach($data as $x => $v){
    switch ($x){
        case "pseudo":
            $req = 'UPDATE user SET pseudo=:valeur WHERE username = "'.$data["username"].'"';
            $update = $bdd -> prepare($req);
            $update -> execute([":valeur"=>$v]);
            break;
        case "avatar":
            $req = 'UPDATE user SET pp=:valeur WHERE username = "'.$data["username"].'"';
            $update = $bdd -> prepare($req);
            $update -> execute([":valeur"=>$v]);
            break;
        case "banner":
            $req = 'UPDATE user SET banner=:valeur WHERE username = "'.$data["username"].'"';
            $update = $bdd -> prepare($req);
            $update -> execute([":valeur"=>$v]);
            break;
        case "bio":
            $req = 'UPDATE user SET bio=:valeur WHERE username = "'.$data["username"].'"';
            $update = $bdd -> prepare($req);
            $update -> execute([":valeur"=>$v]);
            break;  
    }
}
?>