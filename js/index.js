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
    wut = "Astair";
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitement;
    httpRequest.open('GET', `http://localhost/owltree/api/api.php/get/data?user=${wut}`, true);
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