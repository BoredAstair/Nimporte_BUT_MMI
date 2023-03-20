<?php
include("function.php");
include("request.php");
include("connectBDD.php");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

$savedPlume = selectConditionJoin("*","save_plume","plume","save_plume.user = '{$segments_uri[2]}'","RIGHT","save_plume.plume_id","plume.id");
encodeJson($savedPlume);

?>