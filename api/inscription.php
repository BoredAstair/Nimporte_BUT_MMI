<?php
include("function.php");
include("request.php");
include("connectBDD.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request_method = $_SERVER['REQUEST_METHOD']; //récup le verbe d'action
$request_uri = $_SERVER['REQUEST_URI']; //récup l'uri
$request_headers = getallheaders(); // récup les en-têtes HTTP
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
            ":token" => $token,
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
?>