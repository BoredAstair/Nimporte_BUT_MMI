function ongletsMenu(menu){
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
}

document.addEventListener("DOMContentLoaded", request());

function request(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitement;
    httpRequest.open('GET', 'http://localhost/owltree/api/api.php/get/data/user', true);
    httpRequest.send();
}

function traitement(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
        } else {
        alert('Il y a eu un problème avec la requête.');
        }
    }
}