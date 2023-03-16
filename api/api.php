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
    if($uri_segments[$i] == "api.php"){
        $uri = $i;
    }
}
$segments_uri = [];
for($i=$uri+1; $i<count($uri_segments); $i++){
    array_push($segments_uri, $uri_segments[$i]); //récupère l'uri à partir du fichier api.php pour limiter les segments
}
$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex

if(count($segments_uri) == 2){
    if($segments_uri[0] == "get" && $segments_uri[1] == "plume"){ // récup toutes les plumes
        $allPlume = select("*", "plume");
        encodeJson($allPlume);
    }

    else if($segments_uri[0] == "post" && $segments_uri[1] == "inscription"){ // inscription d'un utilisateur
        $request_body = file_get_contents('php://input'); //récup les infos rempli par l'utilisateur dans une requête post par ex
        $data = json_decode($request_body, true);
        $erreur = [];
        if(isset($data['username']) && isset($data['pseudo']) && isset($data['password']) && isset($data['mail'])){
            $username = $data['username'];
            $pseudo = $data['pseudo'];
            $password = sha1($data['password']);
            $mail = $data['mail'];
            $token = generateToken(16);
            $usernames = select("username", "user");
            if(strlen($username) <= 30 && strlen($pseudo) <= 30 && strlen($data['password']) > 5 && !in_array($username, $usernames)){
                $request = 'INSERT INTO user(username, mail, pseudo, password, token, token_date) VALUES(:username, :mail, :pseudo, :password, :token, :token_date)';
                $insert = $bdd -> prepare($request);
                $insert -> execute([
                    ":username" => $username,
                    ":mail" => $mail,
                    ":pseudo" => $pseudo,
                    ":password" => $password,
                    ":token" => generateToken(16),
                    ":token_date" => date("Y-m-d H:i:s")
                ]);
                $erreur['state'] = "valide";
                $erreur['token'] = $token;
                encodeJson($erreur);
            }
            else{
                if(strlen($username) > 30){
                    $erreur['username'] = "Merci de rentrer un nom d'utilisateur inférieur à 30 caractères";
                }
                if(strlen($pseudo) > 30){
                    $erreur['pseudo'] = "Merci de rentrer un pseudo inférieur à 30 caractères";
                }
                if(strlen($data['password']) <= 5){
                    $erreur['password'] = "Merci de rentrer un mot de passe supérieur à 5 caractères";
                }
                if(in_array($username, $usernames)){
                    $erreur['userExist'] = "Le nom d'utilisateur est déjà utilisé veuillez en utilisé un autre";
                }    
                encodeJson($erreur);
            }    
        }
        else{
            $erreur['input'] = "Merci de remplir tous les champs";
            encodeJson($erreur);
        }
    }
    else if($segments_uri[0] == "post" && $segments_uri[1] == "login"){ // connexion d'un utilisateur
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        $erreur = [];
        if(isset($data['username']) && isset($data['password'])){
            $username = $data['username'];
            $password = sha1($data['password']);
            $usernames = select("username", "user");
            $request = "SELECT * FROM user WHERE username=:username";
            $select = $bdd -> prepare($request);
            $select -> execute([
                ":username"=> $username
            ]);
            $user = $select -> fetchAll(PDO::FETCH_ASSOC);
            if(count($user) == 1){
                if($user[0]["password"] == $password){
                    $token = generateToken(16);
                    $request = "UPDATE user SET token=:token, token_date=:date_token WHERE username=:username";
                    $update = $bdd -> prepare($request);
                    $update -> execute([
                        ":token"=> $token,
                        ":date_token"=> date("Y-m-d H:i:s"),
                        ":username"=>$username
                    ]);
                    $erreur["state"] = "valide";
                    $erreur["token"] = $token;

                    encodeJson($erreur);
                }
                else{
                    $erreur['password'] = "Le mot de passe est erronné";
                    encodeJson($erreur);
                }
            }
            else{
                $erreur['user'] = "Le nom d'utilisateur n'existe pas";
                encodeJson($erreur);
            }
        }
        else{
            $erreur['champ'] = "Merci de remplir tous les champs";
            encodeJson($erreur);
        }
    }
    else if ($segments_uri[0] == "get" && explode("?",$segments_uri[1])[0] == "data"){ // récup toutes les plumes sauvegardé par un utilisateur)
        $dataUser = selectCondition("username,pseudo,mail,pp,banner,bio", "user", "username = '{$_GET['user']}'");
        encodeJson($dataUser);
    }
    else{
        echo "erreur 404";
    }
}
if(count($segments_uri) == 3){
    if($segments_uri[0] == "get" && $segments_uri[1] == "save" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur
        $savedPlume = selectConditionJoin("*","save_plume","plume","save_plume.user = '{$segments_uri[2]}'","RIGHT","save_plume.plume_id","plume.id");
        encodeJson($savedPlume);
    }
    else if ($segments_uri[0] == "get" && $segments_uri[1] == "like" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur)
        $likedPlume = selectConditionJoin("*","like_plume","plume","like_plume.user = '{$segments_uri[2]}'","RIGHT","like_plume.plume_id","plume.id");
        encodeJson($likedPlume);
    }
    else if ($segments_uri[0] == "get" && $segments_uri[1] == "plume" && isset($segments_uri[2])){ // récup toutes les plumes sauvegardé par un utilisateur)
        $plumeUser = selectCondition("*","plume","plume.user = '{$segments_uri[2]}'");
        encodeJson($plumeUser);
    }
    else{
        echo "erreur 404";
    }
}
?>