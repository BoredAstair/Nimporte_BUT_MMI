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
    $request = 'SELECT * FROM user INNER JOIN plume ON plume.user = user.username';
    $select = $bdd -> prepare($request);
    $select -> execute();
    $allPlume = $select -> fetchAll(PDO::FETCH_ASSOC);
    encodeJson($allPlume);
    $returnPlume = [];
    // foreach($allPlume as $plume){
    //     if(empty($plume["answer_to"])){
    //         $returnPlume[$plume['id']]['user'] = $plume['user'];
    //         $returnPlume[$plume['id']]['content'] = $plume['content'];
    //         $returnPlume[$plume['id']]['hashtag'] = $plume['hashtag'];
    //         $returnPlume[$plume['id']]['posted_at'] = $plume['posted_at'];
    //         $returnPlume[$plume['id']]['pseudo'] = $plume['pseudo'];
    //         $returnPlume[$plume['id']]['pp'] = $plume['pp'];
    //     }
    //     else{
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['user'] = $plume['user'];
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['content'] = $plume['content'];
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['hashtag'] = $plume['hashtag'];
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['posted_at'] = $plume['posted_at'];
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['pseudo'] = $plume['pseudo'];
    //         $returnPlume[$plume['answer_to']]['answers'][$plume['id']]['pp'] = $plume['pp'];
    //     }
    // }
    // encodeJson($returnPlume);
}
else if($request_method == 'GET' && count($segments_uri) == 1){
    if($segments_uri[0]=="nb_like"){
        $requestLike = 'SELECT COUNT(plume_id) as nb_like , plume_id FROM like_plume GROUP BY plume_id';
        $countLike = $bdd -> prepare($requestLike);
        $countLike -> execute();
        $nbLikes = $countLike -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($nbLikes);
    }
    else if($segments_uri[0]=="nb_preen"){
        $requestPreen = 'SELECT COUNT(retweet_id) as nb_preen , retweet_id FROM retweet GROUP BY retweet_id';
        $countPreen = $bdd -> prepare($requestPreen);
        $countPreen -> execute();
        $nbPreens = $countPreen -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($nbPreens);       
    }
    else if($segments_uri[0]=="nb_comment"){
        $requestComment = 'SELECT COUNT(answer_to) as nb_comment , answer_to FROM plume GROUP BY answer_to';
        $countComment = $bdd -> prepare($requestComment);
        $countComment -> execute();
        $nbComments = $countComment -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($nbComments);             
    }
    else if($segments_uri[0]=="state_like"){
        $requestState = 'SELECT * FROM plume INNER JOIN like_plume ON like_plume.plume_id = plume.id';
        $stateLike = $bdd -> prepare($requestState);
        $stateLike -> execute();
        $states = $stateLike -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($states);
    }
    else if($segments_uri[0]=="recent"){
        $requestRecent = 'SELECT * FROM plume ORDER BY posted_at DESC';
        $stateRecent = $bdd -> prepare($requestState);
        $stateRecent -> execute();
        $statesRecent = $stateRecent -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($statesRecent);       
    }
    else if($segments_uri[0]=="tendance"){
        $requestTendance = 'SELECT COUNT(plume_id) as nb_like, plume_id FROM like_plume GROUP BY plume_id ORDER BY nb_like DESC';
        $stateTendance = $bdd -> prepare($requestTendance);
        $stateTendance -> execute();
        $statesTendance = $stateTendance -> fetchAll(PDO::FETCH_ASSOC);
        encodeJson($statesTendance);              
    }
}
else if($request_method == 'POST' && count($segments_uri) == 0){
    if(isset($data['user'])){
        $user = $data['user'];
        $users = select("*", "user");
        $verifUser = false;
        foreach($users as $oneUser){
            if($oneUser['username'] == $user){
                $verifUser = true;
            }
        }
        if($verifUser == true){
            $request = 'SELECT * FROM user INNER JOIN plume ON plume.user = user.username INNER JOIN follow ON user.username = follow.user_followed WHERE follow.user_following=:user ORDER BY posted_at DESC';
            $select = $bdd -> prepare($request);
            $select -> execute([
                ":user"=> $user
            ]);
            $allPlume = $select -> fetchAll(PDO::FETCH_ASSOC);
            encodeJson($allPlume);        
        }
    }
}
?>