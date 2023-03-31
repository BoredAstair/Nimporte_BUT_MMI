<?php
    include("function.php");
    include("request.php");
    include("connectBDD.php");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:*");
    
    $request_headers = getallheaders(); // récup les en-têtes HTTP
    $request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
    $data = json_decode($request_body, true);

    $requestLiked = "SELECT * FROM like_plume LEFT JOIN plume ON like_plume.plume_id = plume.id LEFT JOIN user ON plume.user = user.username WHERE user_like = '".$data['user']."' ORDER BY plume.posted_at DESC";
    $prepaLiked = $bdd -> prepare($requestLiked);
    $prepaLiked -> execute();
    $repLikeds = $prepaLiked -> fetchAll(PDO::FETCH_ASSOC);
    encodeJson($repLikeds);  
?>