<?php
    include("function.php");
    include("request.php");
    include("connectBDD.php");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:*");
    
    $request_headers = getallheaders(); // récup les en-têtes HTTP
    $request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
    $data = json_decode($request_body, true);

    $requestFollow = 'SELECT * FROM plume LEFT JOIN user ON plume.user = user.username WHERE user = "'.$data["user"].'" ORDER BY posted_at DESC';
    $prepaFollow = $bdd -> prepare($requestFollow);
    $prepaFollow -> execute();
    $repFollows = $prepaFollow -> fetchAll(PDO::FETCH_ASSOC);
    encodeJson($repFollows);  
?>