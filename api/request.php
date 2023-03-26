<?php
// REQUETES COURANTES TRIEES PAR ORDRE ALPHABETIQUE

function select($selection, $table){ // selection dans une table
    include("connectBDD.php");
    $request = "SELECT ".$selection." FROM ".$table;
    $select = $bdd -> prepare($request);
    $select -> execute();
    $tableau = $select -> fetchAll(PDO::FETCH_ASSOC);
    return $tableau;
}
function selectCondition($select, $table, $condition){ // selection dans une table avec condition
    include("connectBDD.php");
    $request = "SELECT ".$select." FROM ".$table." WHERE ".$condition;
    $select = $bdd -> prepare($request);
    $select -> execute();
    $tableau = $select -> fetchAll(PDO::FETCH_ASSOC);
    return $tableau;
}
function selectConditionJoin($select, $tableA, $tableB, $condition, $join, $cleA, $cleB){
    include("connectBDD.php");
    $request = "SELECT {$select} FROM {$tableA} {$join} JOIN {$tableB} ON {$cleA} = {$cleB} WHERE {$condition}";
    $select = $bdd -> prepare($request);
    $select -> execute();
    $tableau = $select -> fetchAll(PDO::FETCH_ASSOC);
    return $tableau;
}
function updateData($table, $pseudo, $bio, $pp, $banner){
    include('connectBDD.php');
    $request = "UPDATE {$table} SET pseudo = {$pseudo}, banner = {$banner}, pp = {$pp}, bio = {$bio} WHERE username = {$userID}";
    $select = $bdd -> prepare($request);
    $select -> execute();
}
?>