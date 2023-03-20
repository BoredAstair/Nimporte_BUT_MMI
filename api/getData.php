<?php
require('verifToken.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$dataUser = selectCondition("username,pseudo,mail,pp,banner,bio", "user", "username = '{$userID}'");
        encodeJson($dataUser);

?>