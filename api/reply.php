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
$erreur = [];
if(isset($_GET['user'])&&isset($_GET['plume'])&&isset($_POST['content'])){
    $user = $_GET['user'];
    $plume = $_GET['plume'];
    $content = $_POST['content'];

    $requestUser = "SELECT * FROM user";
    $selectUser = $bdd -> prepare($requestUser);
    $selectUser -> execute([':username'=>$user]);
    $users = $selectUser -> fetchAll(PDO::FETCH_ASSOC);
    $verifUser = false;
    $verifPlume = false;
    foreach($users as $oneUser){
        if($oneUser['username'] == $user){
            $verifUser = true;
        }
    }

    $requestPlume = "SELECT * FROM plume";
    $selectPlume = $bdd -> prepare($requestPlume);
    $selectPlume -> execute([':id' => $plume]);
    $plumes = $selectPlume -> fetchAll(PDO::FETCH_ASSOC);
    foreach($plumes as $onePlume){
        if($onePlume['id'] == $plume){
            $verifPlume = true;
        }
    }

    if($verifUser==true&&$verifPlume==true){
        $request = 'INSERT INTO plume(user, content, answer_to, posted_at) VALUES(:user,:content,:answer_to, :posted_at)';
        $insert = $bdd -> prepare($request);
        $insert -> execute([
            ':user' => $user,
            ':content' => $content,
            ':answer_to' => $plume,
            ':posted_at' => date("Y-m-d H:i:s")
        ]);   
        $erreur["state"] = "valide";    
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
    $erreur["champ"] = "Merci d'écrire au moins 1 caractère";
    encodeJson($erreur);
}
?>