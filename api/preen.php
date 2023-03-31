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
if($request_method == "POST"){
    if(isset($data['user']) && isset($data['plume'])){
        $user = $data['user'];
        $plume = $data['plume'];
        $verifUser = false;
        $verifPlume = false;
        $verifRetweet = false;
        $users = select("*", "user");
        $plumes = select("*", "plume");
        $retweet = select("*", "retweet");
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
        foreach($retweet as $rt){
            if($rt['retweet_id'] == $plume && $rt['retweet_user'] == $user){
                $verifRetweet = true;
            }
        }
        if($verifPlume == true && $verifUser == true && $verifRetweet == false){
            $rqUserPlume = 'SELECT user FROM plume WHERE id=:plume';
            $selectUserPlume = $bdd -> prepare($rqUserPlume);
            $selectUserPlume -> execute([
                ":plume"=>$plume
            ]);
            $userPlume = $selectUserPlume -> fetchAll(PDO::FETCH_ASSOC);
            $request = 'INSERT INTO retweet(retweet_id, retweet_user, plume_user) VALUES(:id,:user, :plumeUser)';
            $insert = $bdd -> prepare($request);
            $insert -> execute([
                ':id' => $plume,
                ':user' => $user,
                ':plumeUser' => $userPlume[0]['user']
            ]);   
            $erreur["state"] = "valide"; 
            $erreur["type"] = "ajout";  
            $erreur["idPlume"] = $plume;
            encodeJson($erreur);
        }
        else if($verifPlume == true && $verifUser == true && $verifRetweet == true){
            $request = 'DELETE FROM retweet WHERE retweet_id = :id AND retweet_user = :user';
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