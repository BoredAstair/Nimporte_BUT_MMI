function con(){
    document.getElementById("patate").innerHTML =`<div id="SideConnexion">
    <form action="#" method="post">
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
        <input type="email" name="email" id="email" placeholder="Email">
        <input type="password" name="password" id="password" placeholder="Mot de Passe">
        <button type="submit">S'inscrire</button>
    </form>
</div>`;
}