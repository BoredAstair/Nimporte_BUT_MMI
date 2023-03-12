function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <div id="form">
        <p id="erreur"></p>
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit" onclick="requeteConnexion()">Se Connecter</button>
    </div>
</div>`;
}

function ins(){
    document.getElementById("patate").innerHTML =`<div id="SideInscription">
    <div id="form">
        <p id="erreur"></p>
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="mail" name="mail" id="mail" placeholder="Mail">       
        <input type="text" name="pseudo" id="pseudo" placeholder="Pseudo">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button onclick="requeteInscription()" type="submit">S'inscrire</button>
    </div>
</div>`;
}

//REQUETE
function requeteInscription(){
    let username = document.getElementById("username").value;
    let mail = document.getElementById("mail").value;
    let pseudo = document.getElementById("pseudo").value;
    let password = document.getElementById("password").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementInscription;
    httpRequest.open('POST', 'http://localhost/owlTree/Nimporte_BUT_MMI/api/api.php/post/inscription', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"username": username, "mail":mail, "pseudo": pseudo, "password": password});
    httpRequest.send(data);
}
function traitementInscription(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            if(response.state == "valide"){
                window.location.href = "index.html";
            }
            else{
                if(response.username){
                    document.getElementById("erreur").innerHTML += `${response.username}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
                if(response.pseudo){
                    document.getElementById("erreur").innerHTML += `${response.pseudo}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
                if(response.password){
                    document.getElementById("erreur").innerHTML += `${response.password}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
                if(response.userExist){
                    document.getElementById("erreur").innerHTML += `${response.userExist}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteConnexion(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementInscription;
    httpRequest.open('POST', 'http://localhost/owlTree/Nimporte_BUT_MMI/api/api.php/post/login', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"username": username, "password": password});
    httpRequest.send(data);
}
function traitementConnexion(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            if(response.state == "valide"){
                window.location.href = "index.html";
            }
            else{
                if(response.user){
                    document.getElementById("erreur").innerHTML += `${response.user}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
                if(response.champ){
                    document.getElementById("erreur").innerHTML += `${response.champ}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
                if(response.password){
                    document.getElementById("erreur").innerHTML += `${response.password}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}