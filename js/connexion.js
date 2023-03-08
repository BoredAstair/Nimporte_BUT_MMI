function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <form action="api/api.php/post/login" method="post">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">Se Connecter</button>
    </form>
</div>`;
}

function ins(){
    document.getElementById("patate").innerHTML =`<div id="SideInscription">
    <form action="api/api.php/post/inscription" method="post">
        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur">
        <input type="pseudo" name="pseudo" id="pseudo" placeholder="Pseudo">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">S'inscrire</button>
    </form>
</div>`;
}
con();