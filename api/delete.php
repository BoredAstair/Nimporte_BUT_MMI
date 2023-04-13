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
    if($uri_segments[$i] == "delete.php"){
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

if($request_method=="POST" && count($segments_uri)==0){
    $user = $data['user'];
    $request = "DELETE FROM follow WHERE user_following=:user OR user_followed=:user";
    $select = $bdd -> prepare($request);
    $select -> execute([
        ":user"=> $user
    ]);

    $request2 ="DELETE FROM like_plume WHERE user_like=:user";
    $select2 = $bdd -> prepare($request2);
    $select2 -> execute([
        ":user"=> $user
    ]);

    $request3 ="DELETE FROM retweet WHERE retweet_user=:user OR plume_user=:user";
    $select3 = $bdd -> prepare($request3);
    $select3 -> execute([
        ":user"=> $user
    ]);

    $request4 = "DELETE FROM save_plume WHERE user_save=:user";
    $select4 = $bdd -> prepare($request4);
    $select4 -> execute([
        ":user"=> $user
    ]);

    $request5 = "SELECT * FROM plume WHERE user=:user";
    $select5 = $bdd -> prepare($request5);
    $select5 -> execute([
        ":user"=> $user
    ]);
    $fetch = $select5 -> fetchAll(PDO::FETCH_ASSOC);
    foreach($fetch as $poubelle){
        $id = $poubelle['id'];
        $erreur['id'] = $id;
        $request6 ="DELETE FROM like_plume WHERE plume_id=:id";
        $select6 = $bdd -> prepare($request6);
        $select6 -> execute([
            ":id"=> $id
        ]);

        $request7 ="DELETE FROM retweet WHERE retweet_id=:id";
        $select7 = $bdd -> prepare($request7);
        $select7 -> execute([
            ":id"=> $id
        ]);

        $request8 ="DELETE FROM save_plume WHERE plume_id=:id";
        $select8 = $bdd -> prepare($request8);
        $select8 -> execute([
            ":id"=> $id
        ]);
    }

    $request9 ="DELETE FROM plume WHERE user=:user";
    $select9 = $bdd -> prepare($request9);
    $select9 -> execute([
        ":user"=> $user
    ]);

    $request10 ="DELETE FROM user WHERE username=:user";
    $select10 = $bdd -> prepare($request10);
    $select10 -> execute([
        ":user"=> $user
    ]);
    $erreur["state"] = "ça marche";
    encodeJson($erreur);
}
?>