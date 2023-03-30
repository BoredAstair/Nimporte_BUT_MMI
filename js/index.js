// save
urlCourante = "http://localhost/owlTree/";

addEventListener('DOMContentLoaded', traitementPermission());
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
        }
        if (xhttpRequest.status === 200) {
            let response = JSON.parse(xhttpRequest.responseText);
            localStorage.setItem("userID", response.userID);
        }
    }    
}


function changeSave(id) {
    var SaveElement = document.getElementById(`SaveElement-${id}`);
    SaveElement.classList.toggle("fa-regular");
    SaveElement.classList.toggle("fa-solid");
}

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
            document.getElementById("imgsendtweet").src = `upload/profile/${response[0]["pp"]}`;
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}

function affProfil(x){
    ongletsMenu('profile','');
    getdatarequest('profile',x);
}


// like
function changeHeart(id) {
    var HeartElement = document.getElementById(`HeartElement-${id}`);
    HeartElement.classList.toggle("fa-regular");
    HeartElement.classList.toggle("fa-solid");
}

// retweet
function changeRetweet() {
    var retweetElement = document.getElementById("RetweetElement");
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

//retour home
function retour() {
    var containerTop = document.querySelector(".top");
    containerTop.style.display = "flex";
    var containerCentre = document.querySelector(".tweet");
    containerCentre.style.display = "flex";
    var commentTweet = $(".comment-tweet");
    commentTweet.hide();
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

    plumecontent = document.getElementById('textarea').value;
    let token = localStorage.getItem('token');
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = responsePermission;
    httpRequest.open('POST', `${urlCourante}api/verifToken.php`, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify({"userID": localStorage.getItem("userID"), "content": plumecontent});
    httpRequest.send(data);
}

// close pop-up
function closeTweetPopup(e){
    const element = e.srcElement;
    if(element.classList.contains("popup-container")){
      const popupContainer = document.querySelector('.popup-container');
      popupContainer.style.display = 'none';
      html[0].style.overflowY='visible';
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
            }
        }
        if(menu == 'parameters'){
            getdatarequest('param',localStorage.getItem('userID'));
        }
        if(menu == 'home'){
            requeteGetFollower();
        }
    }
}

function ResteEnHaut(){
    window.scrollTo(0,0);
}

function request(){
    wut = "Astair";
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitement;
    httpRequest.open('GET', `${urlCourante}api/api.php/get/data?user=${wut}`, true);
    httpRequest.send();
}

function traitement(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            console.log(response);
            document.getElementById("username").value = "@" + response[0]["username"];
            document.getElementById("pseudo").value = response[0]["pseudo"];
            document.getElementById("email").value = response[0]["mail"];
            if(response[0]["pp"]){
                document.getElementById("default-profile").src = 'upload/profile/'+response[0]["pp"];
            }
            if(response[0]["banner"]){
                document.getElementById("bannerProfile").src = 'upload/banner/'+response[0]["banner"];
            }
            if(response[0]["bio"]){
                document.getElementById("biography").value = response[0]["bio"];
            }
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
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
}

function deconnexion(){
    affiche();
    document.getElementById('texte-popup').innerText="Souhaitez-vous vous déconnecter?";
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
    document.getElementById(`${number}`).classList.remove('none');
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
    }
}
