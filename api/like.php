<?php
include("function.php");
include("request.php");
include("connectBDD.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request_method = $_SERVER['REQUEST_METHOD']; //récup le verbe d'action
$request_uri = $_SERVER['REQUEST_URI']; //récup l'uri
$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$erreur = [];
if($request_method == "GET"){
    $likedPlume = selectConditionJoin("*","like_plume","plume","like_plume.user_like = '{$segments_uri[2]}'","RIGHT","like_plume.plume_id","plume.id");
    encodeJson($likedPlume);
}
else if($request_method == "POST"){
    if(isset($data['user']) && isset($data['plume'])){
        $user = $data['user'];
        $plume = $data['plume'];
        $verifUser = false;
        $verifPlume = false;
        $verifLiked = false;
        $users = select("*", "user");
        $plumes = select("*", "plume");
        $liked = select("*", "like_plume");
        foreach($users as $oneUser){
            if($oneUser['username'] == $user){
                $verifUser = true;
            }
        }
        foreach($plumes as $onePlume){
            if($onePlume['id'] == $plume){
                $verifPlume = true;
            }
        }
        foreach($liked as $like){
            if($like['plume_id'] == $plume && $like['user_like'] == $user){
                $verifLiked = true;
            }
        }
        if($verifPlume == true && $verifUser == true && $verifLiked == false){
            $request = 'INSERT INTO like_plume(plume_id, user_like) VALUES(:id,:user)';
            $insert = $bdd -> prepare($request);
            $insert -> execute([
                ':id' => $plume,
                ':user' => $user
            ]);   
            $erreur["state"] = "valide"; 
            $erreur["type"] = "ajout";  
            $erreur["idPlume"] = $plume;
            encodeJson($erreur);
        }
        else if($verifPlume == true && $verifUser == true && $verifLiked == true){
            $request = 'DELETE FROM like_plume WHERE plume_id = :id AND user_like = :user';
            $delete = $bdd -> prepare($request);
            $delete -> execute([
                ':id' => $plume,
                ':user' => $user
            ]);
            $erreur['state'] = "valide";
            $erreur['type'] = "suppression";
            $erreur["idPlume"] = $plume;
            encodeJson($erreur);
        }
        else{
            if($verifUser==false){
                $erreur["user"] = "Le nom d'utilisateur n'est pas reconnu";
            }
            if($verifPlume==false){
                $erreur["plume"] = "La plume n'existe pas";
            }
            encodeJson($erreur);
        }
    }
    else{
        $erreur['champ'] = "Pas assez de paramètres";
    }
}
?>