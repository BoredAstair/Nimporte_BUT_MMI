<?php
include("function.php");
include("request.php");
include("connectBDD.php");

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
        $erreur = [];
        if(isset($_POST['username']) && isset($_POST['pseudo']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $pseudo = $_POST['pseudo'];
            $password = sha1($_POST['password']);
            $token = generateToken(16);
            $usernames = select("username", "user");
            if(strlen($username) <= 30 && strlen($pseudo) <= 30 && strlen($_POST['password']) > 5 && !in_array($username, $usernames)){
                $request = 'INSERT INTO user(username, pseudo, password, token, token_date) VALUES(:username, :pseudo, :password, :token, :token_date)';
                $insert = $bdd -> prepare($request);
                $insert -> execute([
                    ":username" => $username,
                    ":pseudo" => $pseudo,
                    ":password" => $password,
                    ":token" => generateToken(16),
                    ":token_date" => date("Y-m-d H:i:s")
                ]);
            }
            else{
                if(strlen($username) > 30){
                    $erreurUsername = "Merci de rentrer un nom d'utilisateur inférieur à 30 caractères";
                    array_push($erreur, $erreurUsername);
                }
                if(strlen($pseudo) > 30){
                    $erreurPseudo = "Merci de rentrer un pseudo inférieur à 30 caractères";
                    array_push($erreur, $erreurPseudo);
                }
                if(strlen($_POST['password']) <= 5){
                    $erreurPassword = "Merci de rentrer un mot de passe supérieur à 5 caractères";
                    array_push($erreur, $erreurPassword);
                }
                if(in_array($username, $usernames)){
                    $erreurUsernameExist = "Le nom d'utilisateur est déjà utilisé veuillez en utilisé un autre";
                    array_push($erreur, $erreurUsernameExist);
                }    
                encodeJson($erreur);
            }    
        }
        else{
            $erreurInput = "Merci de remplir tous les champs";
            array_push($erreur, $erreurInput);
            encodeJson($erreur);
        }
    }
    else if($segments_uri[0] == "post" && $segments_uri[1] == "login"){ // connexion d'un utilisateur
        $erreur = [];
        if(isset($_POST['username']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $password = sha1($_POST['password']);
            $usernames = select("username", "user");
            $request = "SELECT * FROM user WHERE username=:username";
            $select = $bdd -> prepare($request);
            $select -> execute([
                ":username"=> $username
            ]);
            $user = $select -> fetchAll(PDO::FETCH_ASSOC);
            if(count($user) == 1){
                if($user[0]["password"] == $password){
                    $request = "UPDATE user SET token=:token, token_date=:date_token WHERE username=:username";
                    $update = $bdd -> prepare($request);
                    $update -> execute([
                        ":token"=> generateToken(16),
                        ":date_token"=> date("Y-m-d H:i:s"),
                        ":username"=>$username
                    ]);
                    echo("connecté");
                    // rediriger à la bonne page
                }
                else{
                    array_push($erreur, "Le mot de passe est erronné");
                    encodeJson($erreur);
                }
            }
            else{
                array_push($erreur, "Le nom d'utilisateur n'existe pas");
                encodeJson($erreur);
            }
        }
        else{
            array_push($erreur, "Merci de remplir tous les champs");
            encodeJson($erreur);
        }
    }
    else{
        echo "erreur 404";
    }
}
?>