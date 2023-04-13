urlCourante = "http://localhost/owlTree/Nimporte_BUT_MMI/";
function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <div id="AfficheErreur">
        <p id="erreur"></p>
    </div>
    <div id="form">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" autocomplete="off">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit" onclick="requeteConnexion()">Se Connecter</button>
    </div>
</div>`;
}

function ins(){
    document.getElementById("patate").innerHTML =`<div id="SideInscription">
    <div id="AfficheErreur">
        <p id="erreur"></p>
    </div>
    <div id="form">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" autocomplete="off">
        <input type="mail" name="mail" id="mail" placeholder="Mail" autocomplete="off">    
        <input type="text" name="pseudo" id="pseudo" placeholder="Pseudo">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button onclick="requeteInscription()" type="submit">S'inscrire</button>
    </div>
</div>`;
}

//Requete d'inscription
function requeteInscription(){
    let username = document.getElementById("username").value;
    let mail = document.getElementById("mail").value;
    let pseudo = document.getElementById("pseudo").value;
    let password = document.getElementById("password").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementInscription;
    httpRequest.open('POST', `${urlCourante}api/inscription.php`, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"username": username, "mail":mail, "pseudo": pseudo, "password": password});
    httpRequest.send(data);
}

function traitementInscription(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            console.log(response);
            if(response.state == "valide"){
                localStorage.setItem("token",response.token);
                window.location.href = "index.html";
            }
            else{
                document.getElementById("erreur").innerHTML ="";
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
                if(response.input){
                    document.getElementById("erreur").innerHTML += `${response.input}<br>`;
                    document.getElementById("erreur").style.display = "block";                       
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}

//Requête de connexion
function requeteConnexion(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementConnexion;
    httpRequest.open('POST', `${urlCourante}api/connexion.php`, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"username": username, "password": password});
    httpRequest.send(data);
}

function traitementConnexion(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200){
            let response = JSON.parse(httpRequest.responseText);
            console.log(response);
            if(response.state == "valide"){
                localStorage.setItem("token", response.token);
                window.location.href = "index.html";
            }
            else{
                document.getElementById("erreur").innerHTML ="";
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

