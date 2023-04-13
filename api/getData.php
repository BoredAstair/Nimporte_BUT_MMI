<?php
include('request.php');
include('function.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");


$dataUser = selectCondition("username,pseudo,mail,pp,banner,bio", "user", "username = '{$_GET['userID']}'");
array_push($dataUser, selectCondition("user_following", "follow", "user_followed = '{$_GET['userID']}'"));
encodeJson($dataUser);

?>