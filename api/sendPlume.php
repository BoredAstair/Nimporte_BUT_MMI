<?php
include('request.php');
include('function.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$request = "INSERT INTO username, token, token_date FROM user WHERE token = '{$value}'";
            $select = $bdd -> prepare($request);
            $select -> execute();

?>