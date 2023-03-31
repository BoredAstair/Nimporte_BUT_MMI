urlCourante = "http://localhost/owlTree/Nimporte_BUT_MMI/";
logUser = localStorage.getItem("userID");
if(!localStorage.getItem("themeColor")){
    localStorage.setItem("themeColor", "yellow");
}
function requeteGetFollower(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementGetFollower;
    let user = logUser;
    httpRequest.open('POST', `${urlCourante}api/plume.php`, true);
    let data = JSON.stringify({"user":user});
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(data);
}
function traitementGetFollower(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            ongletsMenu("home", "jsp");
            OngletBarreMenu('4');
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            if(document.getElementsByClassName("center-comment")[0]){
                document.getElementsByClassName("center-comment")[0].innerHTML = "";
            }
            let response = JSON.parse(httpRequest.responseText);
            if(response['etat']!=undefined){
                document.getElementById("no-friend").classList.remove("none");
            }
            else{
                for(plume of response){
                    if(plume['answer_to'] == null){
                        if(plume['pp'] == null){
                            src = "ressource/icones/default-profile.jpg";
                        }
                        else{
                            src = plume['pp'];
                        }
                        if(plume['image'] != null){
                            srcImage = plume['image'];
                        }
                        else{
                            srcImage = '';
                        }
                        let userProfile = plume['user'];
                        document.getElementById("group-tweet").innerHTML += `
                        <section class="tweet" id="id-${plume['id']}">
                            <section class="tweet-profil">
                                <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                    <img src="${src}" classe="photo">
                                    <h3>${plume['pseudo']}</h3>
                                    <span>@${plume['user']}</span>
                                </section>
                                <section class="tweet-save">
                                    <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                                </section>
                            </section>       
                            <section class="tweet-message">
                                <p>${plume['content']}</p>
                                <img id="" src="${srcImage}">
                            </section>
                            <section class="tweet-icons">
                                <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume['id']}">0</span></i>
                                <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume['id']}">0</span></i>
                                <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume['id']}">0</span></i>
                            </section>
                        </section> 
                        `;    
                    }    
                }
            }
            setTimeout(()=>{
                requeteStateLike();
                requeteNbLike();
                requeteNbPreen();
                requeteNbComment();
                setTimeout(()=>{
                    requeteStateSave();
                    setTimeout(()=>{
                        requeteAffichUser();
                    });            
                },250);
            });
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteGetAll(){
    httpRequestAll = new XMLHttpRequest();
    httpRequestAll.onreadystatechange = traitementGetAll;
    httpRequestAll.open('GET', `${urlCourante}api/plume.php`, true);
    httpRequestAll.setRequestHeader("Content-Type", "application/json");
    httpRequestAll.send();
}
function traitementGetAll(){
    if (httpRequestAll.readyState === XMLHttpRequest.DONE) {
        if (httpRequestAll.status === 200) {
            let response = JSON.parse(httpRequestAll.responseText);
            tableau = response;
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteGetTendance(){
    httpRequestTendance = new XMLHttpRequest();
    httpRequestTendance.onreadystatechange = traitementGetTendance;
    httpRequestTendance.open('GET', `${urlCourante}api/plume.php/tendance`, true);
    httpRequestTendance.setRequestHeader("Content-Type", "application/json");
    httpRequestTendance.send();
}
function traitementGetTendance(){
    if (httpRequestTendance.readyState === XMLHttpRequest.DONE) {
        if (httpRequestTendance.status === 200) {
            OngletBarreMenu('6');
            document.getElementById("no-friend").classList.add("none");
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            if(document.getElementsByClassName("center-comment")[0]){
                document.getElementsByClassName("center-comment")[0].innerHTML = "";
            }
            let response = JSON.parse(httpRequestTendance.responseText);
            requeteGetAll();
            setTimeout(() => {
                for(like of response){
                    for(plume of tableau){
                        if(like['plume_id']==plume['id']){
                            if(plume['answer_to'] == null){
                                if(plume['pp'] == null){
                                    src = "ressource/icones/default-profile.jpg";
                                }
                                else{
                                    src = plume['pp'];
                                }
                                if(plume['image'] != null){
                                    srcImage = plume['image'];
                                }
                                else{
                                    srcImage = '';
                                }    
                                let userProfile = plume['user'];
                                document.getElementById("group-tweet").innerHTML += `
                                <section class="tweet" id="id-${plume['id']}">
                                    <section class="tweet-profil">
                                        <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                            <img src="${src}" classe="photo">
                                            <h3>${plume['pseudo']}</h3>
                                            <span>@${plume['user']}</span>
                                        </section>
                                        <section class="tweet-save">
                                            <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                                        </section>
                                    </section>       
                                    <section class="tweet-message">
                                        <p>${plume['content']}</p>
                                        <img id="" src="${srcImage}">
                                    </section>
                                    <section class="tweet-icons">
                                        <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume['id']}">0</span></i>
                                        <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume['id']}">0</span></i>
                                        <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume['id']}">0</span></i>     
                                    </section>
                                </section> 
                                `;    
                            }
                        }
                    }
                }
                idLike = [];
                for(like of response){
                    idLike.push(like["plume_id"]);
                }    
                for(plume of tableau){
                    if(idLike.includes(plume["id"]) == false){
                        if(plume['answer_to'] == null){
                            if(plume['pp'] == null){
                                src = "ressource/icones/default-profile.jpg";
                            }
                            else{
                                src = plume['pp'];
                            }
                            if(plume['image'] != null){
                                srcImage = plume['image'];
                            }
                            else{
                                srcImage = '';
                            }
                            let userProfile = plume['user'];
                            document.getElementById("group-tweet").innerHTML += `
                            <section class="tweet" id="id-${plume['id']}">
                                <section class="tweet-profil">
                                    <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                        <img src="${src}" classe="photo">
                                        <h3>${plume['pseudo']}</h3>
                                        <span>@${plume['user']}</span>
                                    </section>
                                    <section class="tweet-save">
                                        <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                                    </section>
                                </section>       
                                <section class="tweet-message">
                                    <p>${plume['content']}</p>
                                    <img id="" src="${srcImage}">
                                </section>
                                <section class="tweet-icons">
                                    <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume['id']}">0</span></i>
                                    <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume['id']}">0</span></i>
                                    <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume['id']}">0</span></i>    
                                </section>
                            </section> 
                            `;    
                        }
                    }
                }
                setTimeout(()=>{
                    requeteStateLike();
                    requeteNbLike();
                    requeteNbPreen();
                    requeteNbComment();
                    setTimeout(()=>{
                        requeteStateSave();
                        setTimeout(()=>{
                            requeteAffichUser();
                        });                
                    },250);
                });                       
            }, 150);
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteGetRecent(){
    httpRequestRecent = new XMLHttpRequest();
    httpRequestRecent.onreadystatechange = traitementGetRecent;
    httpRequestRecent.open('GET', `${urlCourante}api/plume.php/recent`, true);
    httpRequestRecent.setRequestHeader("Content-Type", "application/json");
    httpRequestRecent.send();
}
function traitementGetRecent(){
    if (httpRequestRecent.readyState === XMLHttpRequest.DONE) {
        if (httpRequestRecent.status === 200) {
            OngletBarreMenu('5');
            document.getElementById("no-friend").classList.add("none");
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            if(document.getElementsByClassName("center-comment")[0]){
                document.getElementsByClassName("center-comment")[0].innerHTML = "";
            }
            let response = JSON.parse(httpRequestRecent.responseText);
            for(plume of response){
                if(plume['answer_to'] == null){
                    if(plume['pp'] == null){
                        src = "ressource/icones/default-profile.jpg";
                    }
                    else{
                        src = plume['pp'];
                    }
                    if(plume['image'] != null){
                        srcImage = plume['image'];
                    }
                    else{
                        srcImage = '';
                    }
                    let userProfile = plume['user'];
                    document.getElementById("group-tweet").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="${srcImage}">
                        </section>
                        <section class="tweet-icons">
                            <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                            <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                            <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                        </section>
                    </section> 
                    `;    
                }
            }
            setTimeout(()=>{
                requeteStateLike();
                requeteNbLike();
                requeteNbPreen();
                requeteNbComment();
                setTimeout(()=>{
                    requeteStateSave();
                    setTimeout(()=>{
                        requeteAffichUser();
                    });            
                },250);
            });
            
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteLike(e){
    let user = logUser;
    let plume = e.srcElement.id.split("-");
    httpRequestPostLike = new XMLHttpRequest();
    httpRequestPostLike.onreadystatechange = traitementLike;
    httpRequestPostLike.open('POST', `${urlCourante}api/like.php`, true);
    httpRequestPostLike.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user, "plume": plume[1]});
    httpRequestPostLike.send(data);
}
function traitementLike(){
    if (httpRequestPostLike.readyState === XMLHttpRequest.DONE) {
        if (httpRequestPostLike.status === 200) {
            responsePostLike = JSON.parse(httpRequestPostLike.responseText);
            if(responsePostLike.state == "valide"){
                changeHeart(responsePostLike.idPlume);
                requeteNbLike();
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requetePreen(e){
    let user = logUser;
    let plume = e.srcElement.id.split("-");
    httpRequestPostPreen = new XMLHttpRequest();
    httpRequestPostPreen.onreadystatechange = traitementPreen;
    httpRequestPostPreen.open('POST', `${urlCourante}api/preen.php`, true);
    httpRequestPostPreen.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user, "plume": plume[1]});
    httpRequestPostPreen.send(data);
}
function traitementPreen(){
    if (httpRequestPostPreen.readyState === XMLHttpRequest.DONE) {
        if (httpRequestPostPreen.status === 200) {
            responsePostPreen = JSON.parse(httpRequestPostPreen.responseText);
            if(responsePostPreen.state == "valide"){
                changeRetweet(responsePostPreen.idPlume);
                requeteNbPreen();
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}


function requeteNbLike(){
    httpRequestLike = new XMLHttpRequest();
    httpRequestLike.onreadystatechange = traitementNbLike;
    httpRequestLike.open('GET', `${urlCourante}api/plume.php/nb_like`, true);
    httpRequestLike.setRequestHeader("Content-Type", "application/json");
    httpRequestLike.send();
}
function traitementNbLike(){
    if (httpRequestLike.readyState === XMLHttpRequest.DONE) {
        if (httpRequestLike.status === 200) {
            responseLike = JSON.parse(httpRequestLike.responseText);
            tweets = document.getElementsByClassName("tweet");
            for(tweet of tweets){
                let id = tweet.id.split("-");
                for(like of responseLike){
                    textLike = document.getElementById(`like-${id[1]}`);
                    if(id[1]==like["plume_id"]){
                        textLike.innerText = like['nb_like'];
                        exist = true;
                    }
                }
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteStateLike(){
    httpRequestStateLike = new XMLHttpRequest();
    httpRequestStateLike.onreadystatechange = traitementStateLike;
    httpRequestStateLike.open('GET', `${urlCourante}api/plume.php/state_like`, true);
    httpRequestStateLike.setRequestHeader("Content-Type", "application/json");
    httpRequestStateLike.send();
}
function traitementStateLike(){
    if (httpRequestStateLike.readyState === XMLHttpRequest.DONE) {
        if (httpRequestStateLike.status === 200) {
            responseStateLike = JSON.parse(httpRequestStateLike.responseText);
            let user = logUser;
            for(like of responseStateLike){
                if(user == like["user_like"]){
                    tweetLike = document.getElementById(`HeartElement-${like['plume_id']}`);
                    if(tweetLike != null){
                        changeHeart(like['plume_id']);
                    }
                }
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteSave(e){
    let user = logUser;
    let plume = e.srcElement.id.split("-");
    httpRequestPostSave = new XMLHttpRequest();
    httpRequestPostSave.onreadystatechange = traitementSave;
    httpRequestPostSave.open('POST', `${urlCourante}api/savePlume.php`, true);
    httpRequestPostSave.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user, "plume": plume[1]});
    httpRequestPostSave.send(data); 
}
function traitementSave(){
    if (httpRequestPostSave.readyState === XMLHttpRequest.DONE) {
        if (httpRequestPostSave.status === 200) {
            responsePostSave = JSON.parse(httpRequestPostSave.responseText);
            if(responsePostSave.state == "valide"){
                changeSave(responsePostSave.idPlume);
            }
            if(responsePostSave.type == "ajout"){
                document.getElementById(`SaveText-${responsePostSave.idPlume}`).innerText = "Enregistré";
            }
            if(responsePostSave.type == "suppression"){
                document.getElementById(`SaveText-${responsePostSave.idPlume}`).innerText = "Enregistrer";
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteStateSave(){
    httpRequestStateSave = new XMLHttpRequest();
    httpRequestStateSave.onreadystatechange = traitementStateSave;
    httpRequestStateSave.open('GET', `${urlCourante}api/plume.php/state_save`, true);
    httpRequestStateSave.setRequestHeader("Content-Type", "application/json");
    httpRequestStateSave.send(); 
}
function traitementStateSave(){
    if (httpRequestStateSave.readyState === XMLHttpRequest.DONE) {
        if (httpRequestStateSave.status === 200) {
            responseStateSave = JSON.parse(httpRequestStateSave.responseText);
            let user = logUser;
            for(save of responseStateSave){
                if(user == save["user_save"]){
                    tweetSave = document.getElementById(`SaveElement-${save['plume_id']}`);
                    if(tweetSave != null){
                        changeSave(save['plume_id']);
                        document.getElementById(`SaveText-${save['plume_id']}`).innerText = "Enregistré";
                    }
                }
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}


function requeteNbPreen(){
    httpRequestPreen = new XMLHttpRequest();
    httpRequestPreen.onreadystatechange = traitementNbPreen;
    httpRequestPreen.open('GET', `${urlCourante}api/plume.php/nb_preen`, true);
    httpRequestPreen.setRequestHeader("Content-Type", "application/json");
    httpRequestPreen.send();
}
function traitementNbPreen(){
    if (httpRequestPreen.readyState === XMLHttpRequest.DONE) {
        if (httpRequestPreen.status === 200) {
            responsePreen = JSON.parse(httpRequestPreen.responseText);
            tweets = document.getElementsByClassName("tweet");
            for(tweet of tweets){
                let id = tweet.id.split("-");
                for(preen of responsePreen){
                    textPreen = document.getElementById(`preen-${preen.retweet_id}`);
                    if(id[1]==preen.retweet_id){
                        textPreen.innerText = preen.nb_preen;
                    }
                }
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteNbComment(){
    httpRequestComment = new XMLHttpRequest();
    httpRequestComment.onreadystatechange = traitementNbComment;
    httpRequestComment.open('GET', `${urlCourante}api/plume.php/nb_comment`, true);
    httpRequestComment.setRequestHeader("Content-Type", "application/json");
    httpRequestComment.send();
}
function traitementNbComment(){
    if (httpRequestComment.readyState === XMLHttpRequest.DONE) {
        if (httpRequestComment.status === 200) {
            responseComment = JSON.parse(httpRequestComment.responseText);
            tweets = document.getElementsByClassName("tweet");
            for(tweet of tweets){
                let id = tweet.id.split("-");
                textComment = document.getElementById(`comment-${id[1]}`);
                for(comments of responseComment){
                    if(id[1]==comments.answer_to){
                        textComment.innerText = comments.nb_comment;
                    }
                }
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteGetSave(){
    let user = logUser;
    httpRequestGetSave = new XMLHttpRequest();
    httpRequestGetSave.onreadystatechange = traitementGetSave;
    httpRequestGetSave.open('POST', `${urlCourante}api/savePlume.php/user`, true);
    httpRequestGetSave.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user});
    httpRequestGetSave.send(data);
}
function traitementGetSave(){
    if (httpRequestGetSave.readyState === XMLHttpRequest.DONE) {
        if (httpRequestGetSave.status === 200) {
            ongletsMenu('save');
            document.getElementById("group-tweet").innerHTML = "";
            document.getElementById("save-container-centre").innerHTML = 
                `<div id="no-save" class="none">
                    <img id="yaR" src="ressource/icones/yaR.png">
                    <p>Vous n'avez rien enregistré pour l'instant, cliquez sur &ensp;<i class="fa-regular fa-bookmark"></i> &ensp;pour enregistrer une plume pour plus tard...</p>
                </div>`;
            let response = JSON.parse(httpRequestGetSave.responseText);
            if(response['etat']!=undefined){
                document.getElementById("no-save").classList.remove("none");
            }
            for(plume of response){
                if(plume['answer_to'] == null){
                    if(plume['pp'] == null){
                        src = "ressource/icones/default-profile.jpg";
                    }
                    else{
                        src = plume['pp'];
                    }
                    if(plume['image'] != null){
                        srcImage = plume['image'];
                    }
                    else{
                        srcImage = '';
                    }
                    let userProfile = plume['user'];
                    document.getElementById("save-container-centre").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="${srcImage}">
                        </section>
                        <section class="tweet-icons">
                            <i id="HeartElement-${plume['id']}" class="${localStorage.getItem("themeColor")} select-color fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                            <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                            <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                        </section>
                    </section> 
                    `;    
                }
            }
            setTimeout(()=>{
                requeteStateLike();
                requeteNbLike();
                requeteNbPreen();
                requeteNbComment();
                setTimeout(()=>{
                    requeteStateSave();
                    setTimeout(()=>{
                        requeteAffichUserSave();
                    })
                },250);
                        });
            
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteAffichUser(){
    httpRequestAffichUser = new XMLHttpRequest();
    httpRequestAffichUser.onreadystatechange = traitementAffichUser;
    httpRequestAffichUser.open('GET', `${urlCourante}api/users.php`, true);
    httpRequestAffichUser.setRequestHeader("Content-Type", "application/json");
    httpRequestAffichUser.send();
}
function traitementAffichUser(){
    if (httpRequestAffichUser.readyState === XMLHttpRequest.DONE) {
        if (httpRequestAffichUser.status === 200) {
            let response = JSON.parse(httpRequestAffichUser.response);
            document.getElementById("profils-save").innerHTML = ""
            document.getElementById("profils").innerHTML = "";
            for(let i=0; i<4; i++){
                if(response[i].pp != null){
                    var srcProfil = response[i].pp;
                }
                else{
                    var srcProfil = "ressource/icones/default-profile.jpg";
                }
                document.getElementById("profils").innerHTML += `
                <section class="account" onclick="affProfil('${response[i].username}')">
                <img src="${srcProfil}" class="photo">
                    <section class="account-title">
                        <h3>${response[i].pseudo}</h3>
                        <span>@${response[i].username}</span>
                    </section>
                </section>
                `;               
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteAffichUserSave(){
    httpRequestAffichUserSave = new XMLHttpRequest();
    httpRequestAffichUserSave.onreadystatechange = traitementAffichUserSave;
    httpRequestAffichUserSave.open('GET', `${urlCourante}api/users.php`, true);
    httpRequestAffichUserSave.setRequestHeader("Content-Type", "application/json");
    httpRequestAffichUserSave.send();
}
function traitementAffichUserSave(){
    if (httpRequestAffichUserSave.readyState === XMLHttpRequest.DONE) {
        if (httpRequestAffichUserSave.status === 200) {
            let response = JSON.parse(httpRequestAffichUserSave.response);
            document.getElementById("profils-save").innerHTML = ""
            document.getElementById("profils").innerHTML = "";
            for(let i=0; i<4; i++){
                if(response[i].pp != null){
                    var srcProfil = response[i].pp;
                }
                else{
                    var srcProfil = "ressource/icones/default-profile.jpg";
                }
                document.getElementById("profils-save").innerHTML += `
                <section class="account" onclick="affProfil('${response[i].username}')">
                <img src="${srcProfil}" class="photo">
                    <section class="account-title">
                        <h3>${response[i].pseudo}</h3>
                        <span>@${response[i].username}</span>
                    </section>
                </section>
                `;               
            }
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteAffichReply(id){
    let plume = id;
    httpRequestAffichReply = new XMLHttpRequest();
    httpRequestAffichReply.onreadystatechange = traitementAffichReply;
    httpRequestAffichReply.open('POST', `${urlCourante}api/affichReply.php`, true);
    httpRequestAffichReply.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"plume": plume});
    httpRequestAffichReply.send(data);
}
function traitementAffichReply(){
    if (httpRequestAffichReply.readyState === XMLHttpRequest.DONE) {
        if (httpRequestAffichReply.status === 200) {
            let response = JSON.parse(httpRequestAffichReply.responseText);
            newComment();
            if(localStorage.getItem("userPP")=="null"){
                srcPP = "ressource/icones/default-profile.jpg";
            }
            else{
                srcPP = localStorage.getItem("userPP");
            }
            document.getElementById("group-tweet").innerHTML = "";
            containerComment = document.getElementsByClassName("comment-tweet");
            containerComment[0].innerHTML = "";
            for(plume of response){
                if(plume["answer_to"]==null){
                    userPlume = plume["username"];
                    plumeId = plume["id"];
                    if(plume["pp"]!=null){
                        src = plume["pp"];
                    }
                    else{
                        src = "ressource/icones/default-profile.jpg";
                    }
                    if(plume["image"]!=null){
                        srcImg = plume["image"];
                    }
                    else{
                        srcImg = "";
                    }
                    let userProfile = plume['user'];
                    containerComment[0].innerHTML += `
                        <section class="retour" onclick="retour()">
                            <p><i class="fa-solid fa-arrow-left" onclick="retour()"></i> Retour</p>
                        </section>
                        <section class="tweet" id="id-${plume['id']}">
                            <section class="tweet-profil">
                                <section class="tweet-title" onclick="affProfil('${userProfile}')">
                                    <img src="${src}" class="photo">
                                    <h3>${plume["pseudo"]}</h3>
                                    <span>@${plume["username"]}</span>
                                </section>
                                <section class="tweet-save">
                                    <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                                </section>
                            </section>       
                            <section class="tweet-message">
                                <p>${plume["content"]}</p>
                                <img id="" src="${srcImg}">
                            </section>
                            <section class="tweet-icons">
                                <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                                <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                                <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                            </section>
                        </section>
                    `;
                }
            }
            containerComment[0].innerHTML += `
                <section class="comment">
                    <section class="top-comment">
                        <section class="top-left">
                            <img src="${srcPP}" class="photo">
                            <textarea id="textarea" id="message" type="text" name="tweet" placeholder=" Ajouter un commentaire..." maxlength="256" onkeyup="textCounter(this,'counter',256);"></textarea>
                        </section>
                        <section class="top-right">
                            <button id="send" onclick="requeteReply(${plumeId})" class="${localStorage.getItem("themeColor")} select-color" >Répondre <i class="fa-solid fa-arrow-right"></i></button>
                        </section>
                    </section>
                    <section id="trait"></section>
                    <section class="center-comment">
                    </section>
                </section>
            `;
            setTimeout(()=>{
                centerComment = document.getElementsByClassName("center-comment");
                centerComment[0].innerHTML = "";
                for(plume of response){
                    if(plume["answer_to"]!=null){
                        if(plume["pp"]!=null){
                            src = plume["pp"];
                        }
                        else{
                            src = "ressource/icones/default-profile.jpg";
                        }
                        if(plume["image"]!=null){
                            srcImg = plume["image"];
                        }
                        else{
                            srcImg = "";
                        }
                        centerComment[0].innerHTML += `
                        <section class="tweet" id="id-${plume['id']}">
                            <section id="comment-compte">
                                <img src="${src}" class="photo">
                                <h3>${plume["pseudo"]}</h3>
                                <span>@${plume["username"]}</span>
                            </section>
                            <section id="texte">
                                <p>En réponse à <span class="${localStorage.getItem("themeColor")} select-color">@${userPlume}</span></p>
                            </section>
                            <section id="comment-message">
                                <p>${plume["content"]}</p>
                            </section>
                            <section class="tweet-icons">
                                <i id="HeartElement-${plume['id']}" class="${localStorage.getItem("themeColor")} select-color fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                                <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                                <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                            </section>
                        </section>
                        `;  
                        setTimeout(()=>{
                            requeteStateLike();
                            requeteNbLike();
                            requeteNbPreen();
                            requeteNbComment();
                            setTimeout(()=>{
                                requeteStateSave();
                                setTimeout(()=>{
                                    requeteAffichUser();
                                });            
                            },250);
                        });              
                    }
                }
            });
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}
function requeteReply(id){
    let plume = id;
    let user = logUser;
    let content = document.getElementById("textarea").value;
    httpRequestReply = new XMLHttpRequest();
    httpRequestReply.onreadystatechange = traitementReply;
    httpRequestReply.open('POST', `${urlCourante}api/reply.php`, true);
    httpRequestReply.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"plume": plume, "user":user, "content":content});
    httpRequestReply.send(data);
}
function traitementReply(){
    if (httpRequestReply.readyState === XMLHttpRequest.DONE) {
        if (httpRequestReply.status === 200) {
            let response = JSON.parse(httpRequestReply.response);
            requeteAffichReply(response['plume']);
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteDelete(){
    httpRequestDelete = new XMLHttpRequest();
    httpRequestDelete.onreadystatechange = traitementDelete;
    let user = logUser;
    httpRequestDelete.open('POST', `${urlCourante}api/delete.php`, true);
    let data = JSON.stringify({"user":user});
    httpRequestDelete.setRequestHeader("Content-Type", "application/json");
    httpRequestDelete.send(data);
}

function traitementDelete(){
    if (httpRequestDelete.readyState === XMLHttpRequest.DONE){
        if (httpRequestDelete.status === 200){
            let response = JSON.parse(httpRequestDelete.responseText);
            if (response.state == "ça marche"){
                window.location.href = "connexion.html";
            }
        }
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }
}

function requeteSearch(e){
    let value = e.srcElement.value;
    let id = e.srcElement.id;
    if(value.length >= 3){
        httpRequestSearch = new XMLHttpRequest();
        httpRequestSearch.onreadystatechange = traitementSearch;
        httpRequestSearch.open('POST', `${urlCourante}api/search.php`, true);
        let data = JSON.stringify({"value":value, "id":id});
        httpRequestSearch.setRequestHeader("Content-Type", "application/json");
        httpRequestSearch.send(data);    
    }
}
function traitementSearch(){
    if (httpRequestSearch.readyState === XMLHttpRequest.DONE){
        if (httpRequestSearch.status === 200){
            let response = JSON.parse(httpRequestSearch.responseText);
            searchInput("recherche-droite");
            resultSearch = document.getElementById("result-search-droite");
            // switch(response.state){
            //     case "recherche-droite":
            //         resultSearch = document.getElementById("result-search-droite");
            //         break;
            //     case "recherche-save-droite":
            //         resultSearch = document.getElementById("result-search-save-droite");
            //         break;
            //     case "recherche-profil":
            //         resultSearch = document.getElementById("result-search-profil");
            //         break;
            // }
            if(response["0"]){
                resultSearch.innerHTML = `<div class="rapide">`;
                for(account of response){
                    if(account["pp"]==null){
                        srcPP = "ressource/icones/default-profile.jpg";
                    }
                    else{
                        srcPP = account["pp"];
                    }
                    document.querySelector("#result-search-droite .rapide").innerHTML += `
                        <div class="account" onclick="affProfil('${account['username']}')">
                            <img src=${srcPP} alt="">
                            <div class="account-title">
                                <h3>${account["pseudo"]}</h3>
                                <span>@${account['username']}</span>
                            </div>
                        </div>    
                    `;
                }
                resultSearch.innerHTML += `</div>`;
            }
            else{
                resultSearch.innerHTML = `
                <div class="rapide">
                    Aucun résultat
                </div>
                `;
            }
        }
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }
}

function requeteGetFollow(x){
    httpRequestFollow = new XMLHttpRequest();
    httpRequestFollow.onreadystatechange = traitementGetFollow;
    httpRequestFollow.open('POST', `${urlCourante}api/profilePlume.php`, true);
    httpRequestFollow.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": x});
    httpRequestFollow.send(data);
}

function traitementGetFollow(){
    if (httpRequestFollow.readyState === XMLHttpRequest.DONE) {
        if (httpRequestFollow.status === 200) {
            let res = JSON.parse(httpRequestFollow.responseText);
            document.getElementById("1").innerHTML = "";
            for(plume of res){
                if(plume['image']!=null){
                    srcImg = plume['image'];
                }
                else{
                    srcImg = "";
                }
                let userProfile = plume['user'];
                document.getElementById("1").innerHTML += `
                <section class="tweet" id="id-${plume['id']}">
                    <section class="tweet-profil">
                        <section class="tweet-title" onclick="affProfil('${userProfile}')">
                            <img src="${plume['pp']}" classe="photo">
                            <h3>${plume['pseudo']}</h3>
                            <span>@${plume['user']}</span>
                        </section>
                        <section class="tweet-save">
                            <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                        </section>
                    </section>       
                    <section class="tweet-message">
                        <p>${plume['content']}</p>
                        <img id="" src="${srcImg}">
                    </section>
                    <section class="tweet-icons">
                        <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                        <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                        <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                    </section>
                </section> 
                `;
                }
            }
            setTimeout(()=>{
                requeteStateLike();
                requeteNbLike();
                requeteNbPreen();
                requeteNbComment();
                setTimeout(()=>{
                    requeteStateSave();
                    setTimeout(()=>{
                        requeteAffichUser();
                    });            
                },250);
            });
            
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
}

function requeteGetLiked(x){
    httpRequestLiked = new XMLHttpRequest();
    httpRequestLiked.onreadystatechange = traitementGetLiked;
    httpRequestLiked.open('POST', `${urlCourante}api/profileLiked.php`, true);
    httpRequestLiked.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": x});
    httpRequestLiked.send(data);
}

function traitementGetLiked(){
    if (httpRequestLiked.readyState === XMLHttpRequest.DONE) {
        if (httpRequestLiked.status === 200) {
            let res = JSON.parse(httpRequestLiked.responseText);
            document.getElementById("2").innerHTML = "";
            for(plume of res){
                if(plume['image']!=null){
                    srcImg = plume['image'];
                }
                else{
                    srcImg = "";
                }
                let userProfile = plume['user'];
                document.getElementById("2").innerHTML += `
                <section class="tweet" id="id-${plume['id']}">
                    <section class="tweet-profil">
                        <section class="tweet-title" onclick="affProfil('${userProfile}')">
                            <img src="${plume['pp']}" classe="photo">
                            <h3>${plume['pseudo']}</h3>
                            <span>@${plume['user']}</span>
                        </section>
                        <section class="tweet-save">
                            <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                        </section>
                    </section>       
                    <section class="tweet-message">
                        <p>${plume['content']}</p>
                        <img id="" src="${srcImg}">
                    </section>
                    <section class="tweet-icons">
                        <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                        <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                        <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                    </section>
                </section> 
                `;
            }
        }
        setTimeout(()=>{
            requeteStateLike();
            requeteNbLike();
            requeteNbPreen();
            requeteNbComment();
            setTimeout(()=>{
                requeteStateSave();
                setTimeout(()=>{
                    requeteAffichUser();
                });            
            },250);
        });     
    } 
    else {
        console.log('Il y a eu un problème avec la requête.');
    }
}

function requeteGetSaved(x){
    httpRequestSaved = new XMLHttpRequest();
    httpRequestSaved.onreadystatechange = traitementGetSaved;
    httpRequestSaved.open('POST', `${urlCourante}api/profileSaved.php`, true);
    httpRequestSaved.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": x});
    httpRequestSaved.send(data);
}

function traitementGetSaved(){
    if (httpRequestSaved.readyState === XMLHttpRequest.DONE) {
        if (httpRequestSaved.status === 200) {
            let res = JSON.parse(httpRequestSaved.responseText);
            document.getElementById("3").innerHTML = "";
            for(plume of res){
                if(plume['image']!=null){
                    srcImg = plume['image'];
                }
                else{
                    srcImg = "";
                }
                let userProfile = plume['user'];
                document.getElementById("3").innerHTML += `
                <section class="tweet" id="id-${plume['id']}">
                    <section class="tweet-profil">
                        <section class="tweet-title" onclick="affProfil('${userProfile}')">
                            <img src="${plume['pp']}" classe="photo">
                            <h3>${plume['pseudo']}</h3>
                            <span>@${plume['user']}</span>
                        </section>
                        <section class="tweet-save">
                            <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark ${localStorage.getItem("themeColor")} select-color" onclick="requeteSave(event)"></i>
                        </section>
                    </section>       
                    <section class="tweet-message">
                        <p>${plume['content']}</p>
                        <img id="" src="${srcImg}">
                    </section>
                    <section class="tweet-icons">
                        <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart ${localStorage.getItem("themeColor")} select-color" onclick="requeteLike(event)">&ensp;<span class="like" id="like-${plume["id"]}">0</span></i>
                        <i class="fa-regular fa-comment ${localStorage.getItem("themeColor")} select-color" onclick="requeteAffichReply(${plume['id']})">&ensp;<span class="comment" id="comment-${plume["id"]}">0</span></i>
                        <i id="RetweetElement-${plume['id']}" class="fas fa-retweet ${localStorage.getItem("themeColor")} select-color" onclick="requetePreen(event)">&ensp;<span class="preen" id="preen-${plume["id"]}">0</span></i>
                    </section>
                </section> 
                `;
            }
        }
            setTimeout(()=>{
                requeteStateLike();
                requeteNbLike();
                requeteNbPreen();
                requeteNbComment();
                setTimeout(()=>{
                    requeteStateSave();
                    setTimeout(()=>{
                        requeteAffichUser();
                    });            
                },250);
            });
            
    } 
    else {
        console.log('Il y a eu un problème avec la requête.');
    }
}

function requeteNbPlume(user){
    httpRequestNbPlume = new XMLHttpRequest();
    httpRequestNbPlume.onreadystatechange = traitementNbPlume;
    httpRequestNbPlume.open('POST', `${urlCourante}api/countProfile.php/plume`, true);
    httpRequestNbPlume.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": user});
    httpRequestNbPlume.send(data);
}
function traitementNbPlume(){
    if (httpRequestNbPlume.readyState === XMLHttpRequest.DONE) {
        if (httpRequestNbPlume.status === 200) {
            responseNbPlume = JSON.parse(httpRequestNbPlume.responseText);
            document.getElementById("countPlume").innerText = responseNbPlume[0]['nb_plumes'];
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteNbFollower(user){
    httpRequestNbFollower = new XMLHttpRequest();
    httpRequestNbFollower.onreadystatechange = traitementNbFollower;
    httpRequestNbFollower.open('POST', `${urlCourante}api/countProfile.php/follower`, true);
    httpRequestNbFollower.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": user});
    httpRequestNbFollower.send(data);
}
function traitementNbFollower(){
    if (httpRequestNbFollower.readyState === XMLHttpRequest.DONE) {
        if (httpRequestNbFollower.status === 200) {
            responseNbFollower = JSON.parse(httpRequestNbFollower.responseText);
            document.getElementById("countFollower").innerText = responseNbFollower[0]['nb_follower'];
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteNbFollowed(user){
    httpRequestNbFollowed = new XMLHttpRequest();
    httpRequestNbFollowed.onreadystatechange = traitementNbFollowed;
    httpRequestNbFollowed.open('POST', `${urlCourante}api/countProfile.php/followed`, true);
    httpRequestNbFollowed.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({"user": user});
    httpRequestNbFollowed.send(data);
}
function traitementNbFollowed(){
    if (httpRequestNbFollowed.readyState === XMLHttpRequest.DONE) {
        if (httpRequestNbFollowed.status === 200) {
            console.log(httpRequestNbFollowed.responseText);
            responseNbFollowed = JSON.parse(httpRequestNbFollowed.responseText);
            document.getElementById("countFollowed").innerText = responseNbFollowed[0]['nb_followed'];
        } 
        else {
            console.log('Il y a eu un problème avec la requête.');
        }
    }       
}


requeteGetFollower();
setTimeout(()=>{
    if(localStorage.getItem("themeColor")){
        ThemeColor(localStorage.getItem("themeColor"));
    }
    else{
        ThemeColor("yellow");
    }
    requeteStateLike();
    requeteNbLike();
    requeteNbPreen();
    requeteNbComment();
    setTimeout(()=>{
        requeteStateSave();
        setTimeout(()=>{
            requeteAffichUser();
        });
    },250);
});
