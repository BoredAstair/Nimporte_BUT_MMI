function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <div id="form">
        <p>Tu peux mettre l'erreur ici Tessa</p>
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">Se Connecter</button>
    </div>
</div>`;
}

function ins(){
    document.getElementById("patate").innerHTML =`<div id="SideInscription">
    <div id="form">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="text" name="pseudo" id="pseudo" placeholder="Pseudo">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button onclick="requeteInscription()" type="submit">S'inscrire</button>
    </div>
</div>`;
}

//REQUETE
function requeteInscription(){
    console.log("lancement requête");
    let username = document.getElementById("username").value;
    let pseudo = document.getElementById("pseudo").value;
    let password = document.getElementById("password").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementInscription;
    httpRequest.open('POST', 'http://localhost/owlTree/Nimporte_BUT_MMI/api/api.php/post/inscription', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"username": username, "pseudo": pseudo, "password": password});
    httpRequest.send(data);
}
function traitementInscription(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log("requête réussie");
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}
