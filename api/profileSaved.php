<?php
    include("function.php");
    include("request.php");
    include("connectBDD.php");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:*");
    
    $request_headers = getallheaders(); // récup les en-têtes HTTP
    $request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
    $data = json_decode($request_body, true);

    $requestSaved = "SELECT * FROM save_plume LEFT JOIN plume ON plume_id = plume.id LEFT JOIN user ON user.username = plume.user WHERE user_save = '".$data['user']."' ORDER BY plume.posted_at DESC";
    $prepaSaved = $bdd -> prepare($requestSaved);
    $prepaSaved -> execute();
    $repSaveds = $prepaSaved -> fetchAll(PDO::FETCH_ASSOC);
    encodeJson($repSaveds);  
?>