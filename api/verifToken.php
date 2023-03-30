<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include("connectBDD.php");
include('function.php');

    $userID = null;
    $isAuth = false;
    $erreur = [];
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    foreach($data as $name => $value){
        if($name == "autorization"){
            $value = preg_replace('/\\"/','',$value);
            $request = "SELECT username, pp, pseudo, token, token_date FROM user WHERE token = '{$value}'";
            $select = $bdd -> prepare($request);
            $select -> execute();
            $res = $select -> fetchAll(PDO::FETCH_ASSOC);
            if(sizeof($res) == 0){
                http_response_code(401);
                $erreur['state'] = "null";
                encodeJson($erreur);
                die();
            } else {
                if ($res[0]['token_date'] >= strtotime('-2 day')){
                    $isAuth = true;
                    $erreur['userID'] = $res[0]['username'];
                    $erreur['userPP'] = $res[0]['pp'];
                    $erreur['userPseudo'] = $res[0]['pseudo'];
                    $erreur['state'] = 'valid';
                    encodeJson($erreur);
                    die();
                } else {
                    $erreur['state'] = "outated";
                    encodeJson($erreur);
                    die();
                }

            }
        }
    }
?>