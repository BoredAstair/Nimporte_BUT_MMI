function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <form action="#" method="post">
        <p>Tu peux mettre l'erreur ici Tessa</p>
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">Se Connecter</button>
    </form>
</div>`;
}

function ins(){
    document.getElementById("patate").innerHTML =`<div id="SideInscription">
    <form action="#" method="post">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="text" name="nickname" id="nickname" placeholder="Pseudo">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">S'inscrire</button>
    </form>
</div>`;
}