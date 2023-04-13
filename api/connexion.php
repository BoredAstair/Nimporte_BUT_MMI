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
    if($uri_segments[$i] == "connexion.php"){
        $uri = $i;
    }
}
$segments_uri = [];
for($i=$uri+1; $i<count($uri_segments); $i++){
    array_push($segments_uri, $uri_segments[$i]); //récupère l'uri à partir du fichier api.php pour limiter les segments
}
$request_headers = getallheaders(); // récup les en-têtes HTTP
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$erreur = [];
if($request_method=="POST" && count($segments_uri)==0){
    $erreur['username'] = $data["username"];
    $erreur['mdp'] = $data["password"];
    if(isset($data['username']) && isset($data['password']) && $data['username']!="" && $data['password']!=""){
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
                
    
                // encodeJson($erreur);
            }
            else{
                $erreur['password'] = "Le mot de passe est erronné";
                // encodeJson($erreur);
            }
        }
        else{
            $erreur['user'] = "Le nom d'utilisateur n'existe pas";
            // encodeJson($erreur);
        }
    }
    else{
        $erreur['champ'] = "Merci de remplir tous les champs";
        // encodeJson($erreur);
    } 
    encodeJson($erreur);   
}
?>