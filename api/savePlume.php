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
    if($uri_segments[$i] == "savePlume.php"){
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
if($request_method == "POST"){
    if(isset($data['user']) && isset($data['plume']) && count($segments_uri) == 0){
        $user = $data['user'];
        $plume = $data['plume'];
        $verifUser = false;
        $verifPlume = false;
        $verifSaved = false;
        $users = select("*", "user");
        $plumes = select("*", "plume");
        $saved = select("*", "save_plume");
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
        foreach($saved as $save){
            if($save['plume_id'] == $plume && $save['user_save'] == $user){
                $verifSaved = true;
            }
        }
        if($verifPlume == true && $verifUser == true && $verifSaved == false){
            $request = 'INSERT INTO save_plume(plume_id, user_save) VALUES(:id,:user)';
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
        else if($verifPlume == true && $verifUser == true && $verifSaved == true){
            $request = 'DELETE FROM save_plume WHERE plume_id = :id AND user_save = :user';
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
    else if(isset($data['user']) && count($segments_uri)==1){
        if($segments_uri[0]=="user"){
            $user = $data['user'];
            $requestSave = 'SELECT * FROM save_plume INNER JOIN plume ON plume.id = save_plume.plume_id INNER JOIN user ON plume.user = user.username WHERE save_plume.user_save = :user ORDER BY plume.posted_at DESC';
            $saveTweet = $bdd -> prepare($requestSave);
            $saveTweet -> execute([
                ":user"=> $user
            ]);
            $saved = $saveTweet -> fetchAll(PDO::FETCH_ASSOC);
            if(empty($saved)){
                $saved['etat'] = "vide";
            }
            encodeJson($saved);
        }
    }
}
// $savedPlume = selectConditionJoin("*","save_plume","plume","save_plume.user = '{$segments_uri[2]}'","RIGHT","save_plume.plume_id","plume.id");
// encodeJson($savedPlume);

?>