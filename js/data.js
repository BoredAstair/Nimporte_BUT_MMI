urlCourante = "http://localhost/owlTree/Nimporte_BUT_MMI/";

//Requête permettant de récupérer les données des utilisateurs avec deux résultat possible suivant la page ou les informations doivents être entrées
function getdatarequest(x,y){
    httpRequest = new XMLHttpRequest();
    if(x == "param"){
        httpRequest.onreadystatechange = getdatatraitementparam;
    }
    if(x == "profile"){
        httpRequest.onreadystatechange = getdatatraitementprofile;
    }
    httpRequest.open('GET', `${urlCourante}api/getData.php?userID=${y}`, true);
    httpRequest.send();
}

function getdatatraitementparam(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            document.getElementById("username").value = "@" + response[0]["username"];
            document.getElementById("pseudo").value = response[0]["pseudo"];
            document.getElementById("email").value = response[0]["mail"];
            if(response[0]["pp"]){
                document.getElementById("default-profile").src = response[0]["pp"];
            }
            if(response[0]["banner"]){
                document.getElementById("bannerProfile").src = response[0]["banner"];
            }
            if(response[0]["bio"]){
                document.getElementById("biography").value = response[0]["bio"];
            }
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}

function getdatatraitementprofile(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            console.log(response);
            if (localStorage.getItem('userID') != response[0]["username"]){
            if (response[1][0]){
            if (response[1][0]["user_following"].includes(localStorage.getItem("userID"))){
                document.getElementById("follow").classList.add("none");
                document.getElementById("unfollow").classList.remove("none");
            }}} else {
                document.getElementById("follow").classList.add("none");
                document.getElementById("unfollow").classList.add("none");
            }
            document.getElementById("username-profile").innerText = "@" + response[0]["username"];
            document.getElementById("pseudo-profile").innerText = response[0]["pseudo"];
            if(response[0]["pp"]){
                document.getElementById("profile-picture").src = response[0]["pp"];
            }
            if(response[0]["banner"]){
                document.getElementById("banniere-profil").src = response[0]["banner"];
            }
            if(response[0]["bio"]){
                document.getElementById("biography-profile").innerText = response[0]["bio"];
            }
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}//-----

//Requête permettant de rentrer les données modifiées de la page paramètre dans la base de données 
function reqsetdata(){
    let userID = localStorage.getItem("userID");
    let pseudo = document.getElementById("pseudo").value;
    if(document.getElementById("biography").value){
        bio = document.getElementById("biography").value;
        bio = bio.toString();
    };
    if (document.getElementById('avatar').files[0] != null){
        uploadFile("avatar");
        avatar = document.getElementById("avatar").value;
        avatar = avatar.split('\\');
        console.log(avatar);
        avatarx = "upload/profile/" + avatar[2];
    } else {
        avatarx = localStorage.getItem("userPP");
    }
    if (document.getElementById('banner').files[0] != null){
        uploadFile("banner");
        banner = document.getElementById("banner").value;
        banner = banner.split('\\');
        console.log(banner);
        bannerx = "upload/banner/" + banner[2];
    } else {
        bannerx = localStorage.getItem("userBanner");
    }

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitsetdata();
    httpRequest.open('POST', `${urlCourante}api/setData.php`, true);
    data = JSON.stringify({"username":userID, "pseudo": pseudo, "bio": bio, "avatar": avatarx, 'banner': bannerx});
    httpRequest.send(data);
}

function traitsetdata(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log("tout les changement on été validé");
        } else {
            alert('Il y a eu un problème avec la requête.');
        }
    }
}
async function uploadFile(type) {
    //Requête permettant d'enregistrer les images en local
    //based of https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example

    let formData = new FormData(); 
    if(type == "banner"){
        formData.append("banner", banner.files[0]);
    } else if (type == "avatar"){
        formData.append("avatar", avatar.files[0]);
    }
    formData.append("type", type);
    let loca = "profile";
    await fetch(`${urlCourante}api/upload.php`, {
      method: "POST", 
      body: formData
    }).then( response => response.ok ? response.json() : "ERROR LOADING" );
}