<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");


//based of https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example

/* Get the name of the uploaded file */
$filename = $_FILES[$_POST['type']]['name'];
$return = [];
/* Choose where to save the uploaded file */
if($_POST['type'] == "avatar"){
    $location = "../upload/profile/".$filename;
    $return['state'] = 'it worked';
    json_encode($return);
} else if ($_POST['type'] == "banner"){
    $location = "../upload/banner/".$filename;
    $return['state'] = 'it worked banner';
    json_encode($return);
} else {
    $return['state'] = "it didn't";
    json_encode($return);
}

move_uploaded_file($_FILES[$_POST['type']]['tmp_name'], $location);
?>