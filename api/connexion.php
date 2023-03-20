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
            $token = preg_replace('/"/','',generateToken(16));
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
?>