<?php
include("function.php");
// REQUETES COURANTES TRIEES PAR ORDRE ALPHABETIQUE

function select($selection, $table){ // selection dans une table
    connectBDD();
    $request = "SELECT :selection FROM :table";
    $select = $bdd -> prepare($request);
    $select -> execute([
        ":selection" => $selection,
        ":table" => $table
    ]);
}
?>