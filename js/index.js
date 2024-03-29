// save
urlCourante = "http://localhost/owlTree/Nimporte_BUT_MMI/";
addEventListener('DOMContentLoaded', traitementPermission());

//fonction permettant de gérer le token d'un utilisateur
function traitementPermission(){
    let token = localStorage.getItem('token');
    xhttpRequest = new XMLHttpRequest();
    xhttpRequest.onreadystatechange = responsePermission;
    xhttpRequest.open('POST', `${urlCourante}api/verifToken.php`, true);
    xhttpRequest.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify({"autorization": localStorage.getItem("token")});
    xhttpRequest.send(data);
}

function responsePermission(){
    if (xhttpRequest.readyState === XMLHttpRequest.DONE) {
        if (xhttpRequest.status === 401){
            window.location.href = 'connexion.html';
        } else if (xhttpRequest.status === 200) {
            let response = JSON.parse(xhttpRequest.responseText);
            localStorage.setItem("userID", response.userID);
            localStorage.setItem("userPP", response.userPP);
            localStorage.setItem("userPseudo", response.userPseudo);
            localStorage.setItem("userBanner", response.banner);
        }
    }    
}

//fonction permettant de changer le logo de sauvegarde entre plein et vide
function changeSave(id) {
    var SaveElement = document.getElementById(`SaveElement-${id}`);
    SaveElement.classList.toggle("fa-regular");
    SaveElement.classList.toggle("fa-solid");
}

//Requête permettant d'afficher sur la popup de tweet les information de l'utilisateur
function getdatatweet(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = resgetdatatweet;
    httpRequest.open('GET', `${urlCourante}api/getData.php?userID=${localStorage.getItem("userID")}`, true);
    httpRequest.send();
}

function resgetdatatweet(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            document.getElementById("usernamesendtweet").innerText = "@" + response[0]["username"];
            document.getElementById("pseudosendtweet").innerText = response[0]["pseudo"];
            document.getElementById("imgsendtweet").src = `${response[0]["pp"]}`;
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}

//fonction permettant de rediriger vers la page profil d'un utilisateur
function affProfil(x){
    ongletsMenu('profile','');
    getdatarequest('profile',x);
    requeteNbPlume(x);
    requeteNbFollower(x);
    requeteNbFollowed(x);
    dispInput("result-search-droite");
    document.getElementById("recherche-droite").value = "";
    setTimeout(() => {OngletBarre(1)},100);
}


// like
function changeHeart(id) {
    var HeartElement = document.getElementById(`HeartElement-${id}`);
    HeartElement.classList.toggle("fa-regular");
    HeartElement.classList.toggle("fa-solid");
}

// retweet
function changeRetweet(id) {
    var retweetElement = document.getElementById(`RetweetElement-${id}`);
    retweetElement.classList.toggle("rotate");
}

// comment
function comment() {
    var containerTop = document.querySelector(".top");
    containerTop.style.display = "none";
    var containerCentre = document.getElementById("group-tweet");
    containerCentre.style.display = "none";
    var commentTweet = $(".comment-tweet");
    commentTweet.show();
    var comment = document.querySelector(".comment-tweet.none");
    comment.classList.remove("none");
}

//fonction pour ajouter un commentaire à un tweet
function newComment(){
    var containerTop = document.querySelector(".top");
    containerTop.style.display = "none";
    var containerCentre = document.getElementById("group-tweet");
    containerCentre.style.display = "none";
    var commentTweet = $(".comment-tweet");
    commentTweet.show();
    var comment = document.getElementsByClassName("comment-tweet")[0];
    comment.classList.remove("none");
}

//retour home
function retour() {
    var containerTop = document.querySelector(".top");
    containerTop.style.display = "flex";
    var containerCentre = document.getElementById("group-tweet");
    containerCentre.style.display = "flex";
    containerCentre.style.flexDirection = "column";
    var commentTweet = $(".comment-tweet");
    commentTweet.hide();
    containerComment = document.getElementsByClassName("comment-tweet");
    containerComment[0].innerHTML = "";
    requeteGetFollower();
}

// open pop-up
html = document.getElementsByTagName('html');
function DoTweet() {
    const popupContainer = document.querySelector('.popup-container');
    const tweetForm = document.createElement('form');
    popupContainer.appendChild(tweetForm);
    popupContainer.style.display = 'flex';
    html[0].style.overflowY='hidden';
    getdatatweet();
}

//fonction d'envoie de plume
function sendPlume(){
    let plumecontent = document.getElementById('tweetarea').value;
    let hash = plumecontent.match(/#[^# ]*/g);
    if (hash == ""){
        hash = hash.join(',');
    }
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = sendPlumeRes;
    httpRequest.open('POST', `${urlCourante}api/sendPlume.php`, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify({"user": localStorage.getItem("userID"), "content": plumecontent, 'hashtag':hash});
    httpRequest.send(data);
}

function sendPlumeRes(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            if (response.etat == 'valide'){
                document.getElementById('tweetarea').value='';
                closeTheTweetPopup();
            }
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}

//fonction pour fermer la popup de tweet
function closeTheTweetPopup(){
    const popupContainer = document.querySelector('.popup-container');
    popupContainer.style.display = 'none';
    html[0].style.overflowY='visible';
}

//fonction suivre un utilisateur
function follow(){
    document.getElementById("follow").classList.add("none");
    document.getElementById("unfollow").classList.remove("none");
    let followed = document.getElementById("username-profile").innerText;
    followed = followed.replace('@','');
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = followRes;
    httpRequest.open('POST', `${urlCourante}api/follow.php`, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify({"follower": localStorage.getItem("userID"), "followed": followed});
    httpRequest.send(data);
}

//fonction pour arrêter de suivre un utilisateur
function unfollow(){
    document.getElementById("follow").classList.remove("none");
    document.getElementById("unfollow").classList.add("none");
    let following = document.getElementById("username-profile").innerText;
    following = following.replace('@','');
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = followRes;
    httpRequest.open('POST', `${urlCourante}api/unfollow.php`, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify({"follower": localStorage.getItem("userID"), "followed": following});
    httpRequest.send(data);
}

function followRes(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}

// close pop-up
function closeTweetPopup(e){
    const element = e.srcElement;
    if(element.classList.contains("popup-container")){
      const popupContainer = document.querySelector('.popup-container');
      popupContainer.style.display = 'none';
      html[0].style.overflowY='visible';
      document.getElementById("tweetarea").value = "";
    }
}  

//compteur de caractère
function textCounter(champ, champ2, maxlimit) {
    var countchamp = document.getElementById(champ2);
    if (champ.value.length > maxlimit) {
      champ.value = champ.value.substring(0, maxlimit);
      return false;
    } else {
      countchamp.value = maxlimit - champ.value.length;
    }
}

//insertion d'image
function insertImage() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            document.getElementById('image').src = reader.result;
        };
    };
    input.click();
}

//onglets du menu
function ongletsMenu(menu,x){
    menuElements = document.getElementsByClassName('onglet');
    for (const tab of menuElements){
        tab.classList.remove('actif');
    }
    document.getElementById(`${menu}-btn`).classList.add('actif');

    contenu = document.getElementsByClassName('contenu');
    for (const tab of contenu){
        if (!tab.classList.contains('none')){
            tab.classList.add('none');
        }
    }
    document.getElementById(`${menu}`).classList.remove('none');
    ResteEnHaut();
    search = document.getElementsByClassName('HideSearch')
    if (menu == 'home' || menu =='save'){
        for (const tab of search){
            tab.classList.add('none');
        }
    }else{
        for (const tab of search){
            tab.classList.remove('none');
        }
        if(menu == 'profile'){
            if (x == 'clicked'){
                getdatarequest('profile',localStorage.getItem("userID"));
                document.getElementById("follow").classList.add("none");
                document.getElementById("unfollow").classList.add("none");
            }
            else{
                document.getElementById("follow").classList.remove("none");
                document.getElementById("unfollow").classList.add("none");
            }
        }
        if(menu == 'parameters'){
            getdatarequest('param',localStorage.getItem('userID'));
        }
    }
}

//fonction pour retourner en haut de la page
function ResteEnHaut(){
    window.scrollTo(0,0);
}

//popup suppression de compte
popup = document.getElementById('popup-fond');

//permet d'afficher le popup
function affiche(){
    html[0].style.overflowY='hidden';
    popup.classList.toggle('none');
}

//permet de fermer le popup
function quit(){
    html[0].style.overflowY='visible';
    popup.classList.toggle('none');
}

//rempli les popup
function suppression(){
    affiche();
    document.getElementById('texte-popup').innerText="Etes vous sûr de vouloir supprimer votre compte? Cette action est irréversible.";
    document.getElementById('btn-oui').onclick=requeteDelete;
}

//fonction pour afficher la popup de déconnexion
function deconnexion(){
    affiche();
    document.getElementById('texte-popup').innerText="Souhaitez-vous vous déconnecter?";
    document.getElementById('btn-oui').onclick=deco;   
}

//fonction pour déconnecter un utilisateur
function deco(){
    localStorage.removeItem("userID");
    localStorage.removeItem("userPP");
    localStorage.removeItem("userPseudo");
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}

//Changement des images avec celle ajoutée par l'utilisateur
function preview(img, input){
    var preview = document.querySelector(img);
    var file = document.querySelector(input).files[0];
    var reader = new FileReader(); //permet de lire le contenu du fichier sélectionné

    reader.addEventListener('load', function (){
        preview.src = reader.result;
    }, false);

    if (file){
        reader.readAsDataURL(file)
    }  
}

//la jolie barre jaune au hover
function OngletBarre(number){
    menubar = document.getElementsByClassName('selecteur');
    for (const tab of menubar){
        tab.classList.remove('selecteur-actif');
    }
    document.getElementById(`btn${number}`).classList.add('selecteur-actif');
    plumes = document.getElementsByClassName('plumes');
    for (const tab of plumes){
        if (!tab.classList.contains('none')){
            tab.classList.add('none');
        }
    }
    let user = document.getElementById("username-profile").innerText;
    user = user.replace("@",'');
    if(number == 1){
        requeteGetFollow(user);
    }
    if(number == 2){
        requeteGetLiked(user);
    }
    if(number == 3){
        requeteGetSaved(user);
    }
    document.getElementById(`${number}`).classList.remove('none');
    ResteEnHaut();
}

//pareil pour la page d'accueil
function OngletBarreMenu(number){
    menubar = document.getElementsByClassName('selecteur-menu');
    for (const tab of menubar){
        tab.classList.remove('selecteur-actif');
    }
    document.getElementById(`btn${number}`).classList.add('selecteur-actif');
    plumes = document.getElementsByClassName('plumes-accueil');
    for (const tab of plumes){
        if (!tab.classList.contains('none')){
            tab.classList.add('none');
        }
    }
    ResteEnHaut();
}

//le changement de couleurs
function ThemeColor(color){
    btncolor = document.getElementsByClassName('theme-color');
    for (const tab of btncolor){
        tab.classList.remove('theme-color-select');
    }
    document.getElementById(`${color}`).classList.add('theme-color-select');

    selectColor = document.getElementsByClassName('select-color');
    for (const tab of selectColor){
        tab.classList.remove('yellow');
        tab.classList.remove('pink');
        tab.classList.remove('blue');
        tab.classList.remove('green');
        tab.classList.add(`${color}`);
        localStorage.setItem("themeColor", color);
    }
}

//recherche
function searchInput(id){
    switch(id){
        case "recherche-profil":
            rechercheResult = document.getElementById("result-search-profil");
            break;
        case "recherche-droite":
            rechercheResult = document.getElementById("result-search-droite");
            break;
        case "recherche-save-droite":
            rechercheResult = document.getElementById("result-search-save-droite");
            break;
    }
    rechercheResult.classList.remove("none");
}

//fonction permetant de selectionner la barre de recherche (non fonctionnelle)
function dispInput(e){
    // switch(e.srcElement.id){
    //     case "recherche-profil":
    //         rechercheInput = document.getElementById("result-search-profil");
    //         break;
    //     case "recherche-droite":
    //         rechercheInput = document.getElementById("result-search-droite");
    //         break;
    //     case "recherche-save-droite":
    //         rechercheInput = document.getElementById("result-search-save-droite");
    //         break;
    // }
    rechercheResult = document.getElementById(e);
    rechercheResult.classList.add("none");
}
