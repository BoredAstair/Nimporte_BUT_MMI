logUser = "chouette";
console.log(localStorage.getItem("userID"));
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
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            console.log("follower");
            let response = JSON.parse(httpRequest.responseText);
            // console.log(response);
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
                    document.getElementById("group-tweet").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="requeteSave(event)"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="${srcImage}">
                        </section>
                        <section class="tweet-icons">
                            <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like">0</span></i>
                            <i class="fa-regular fa-comment">&ensp;<span class="comment">0</span></i>
                            <i id="RetweetElement-${plume['id']}" class="fas fa-retweet" onclick="changeRetweet()">&ensp;<span class="preen">0</span></i>
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
                },250);
            });
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            alert('Il y a eu un problème avec la requête.');
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
            console.log("tendance");
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            let response = JSON.parse(httpRequestTendance.responseText);
            // console.log(response);
            requeteGetAll();
            setTimeout(() => {
                // console.log(tableau);    
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
                                document.getElementById("group-tweet").innerHTML += `
                                <section class="tweet" id="id-${plume['id']}">
                                    <section class="tweet-profil">
                                        <section class="tweet-title">
                                            <img src="${src}" classe="photo">
                                            <h3>${plume['pseudo']}</h3>
                                            <span>@${plume['user']}</span>
                                        </section>
                                        <section class="tweet-save">
                                            <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="requeteSave(event)"></i>
                                        </section>
                                    </section>       
                                    <section class="tweet-message">
                                        <p>${plume['content']}</p>
                                        <img id="" src="${srcImage}">
                                    </section>
                                    <section class="tweet-icons">
                                        <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like">0</span></i>
                                        <i class="fa-regular fa-comment">&ensp;<span class="comment">0</span></i>
                                        <i id="RetweetElement-${plume['id']}" class="fas fa-retweet" onclick="changeRetweet()">&ensp;<span class="preen">0</span></i>
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
                    // console.log(idLike.includes(plume['id']));
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
                            document.getElementById("group-tweet").innerHTML += `
                            <section class="tweet" id="id-${plume['id']}">
                                <section class="tweet-profil">
                                    <section class="tweet-title">
                                        <img src="${src}" classe="photo">
                                        <h3>${plume['pseudo']}</h3>
                                        <span>@${plume['user']}</span>
                                    </section>
                                    <section class="tweet-save">
                                        <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="requeteSave(event)"></i>
                                    </section>
                                </section>       
                                <section class="tweet-message">
                                    <p>${plume['content']}</p>
                                    <img id="" src="${srcImage}">
                                </section>
                                <section class="tweet-icons">
                                    <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like">0</span></i>
                                    <i class="fa-regular fa-comment">&ensp;<span class="comment">0</span></i>
                                    <i id="RetweetElement-${plume['id']}" class="fas fa-retweet" onclick="changeRetweet()">&ensp;<span class="preen">0</span></i>
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
                    },250);
                });                       
            }, 150);
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            console.log("recent");
            document.getElementById("save-container-centre").innerHTML = "";
            document.getElementById("group-tweet").innerHTML = "";
            let response = JSON.parse(httpRequestRecent.responseText);
            // console.log(response);
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
                    document.getElementById("group-tweet").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="requeteSave(event)"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="${srcImage}">
                        </section>
                        <section class="tweet-icons">
                            <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like">0</span></i>
                            <i class="fa-regular fa-comment">&ensp;<span class="comment">0</span></i>
                            <i id="RetweetElement-${plume['id']}" class="fas fa-retweet" onclick="changeRetweet()">&ensp;<span class="preen">0</span></i>
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
                },250);
            });
            
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            // console.log(httpRequestPostLike.responseText);
            if(responsePostLike.state == "valide"){
                changeHeart(responsePostLike.idPlume);
                requeteNbLike();
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            // console.log(responseLike);
            tweets = document.getElementsByClassName("tweet");
            for(tweet of tweets){
                exist = false;
                let id = tweet.id.split("-");
                for(like of responseLike){
                    if(id[1]==like["plume_id"]){
                        tweet.children[2].children[0].children[0].innerText = like['nb_like'];
                        exist = true;
                    }
                }
                if(exist == false){
                    tweet.children[2].children[0].children[0].innerText = 0;
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            // console.log("state like");
            // console.log(responseStateLike);
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
            alert('Il y a eu un problème avec la requête.');
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
            // console.log(httpRequestPostSave.responseText);
            if(responsePostSave.state == "valide"){
                changeSave(responsePostSave.idPlume);
                console.log(responsePostSave.type);
            }
            if(responsePostSave.type == "ajout"){
                document.getElementById(`SaveText-${responsePostSave.idPlume}`).innerText = "Enregistré";
            }
            if(responsePostSave.type == "suppression"){
                document.getElementById(`SaveText-${responsePostSave.idPlume}`).innerText = "Enregistrer";
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            // console.log("state save");
            // console.log(responseStateSave);
            let user = logUser;
            for(save of responseStateSave){
                if(user == save["user_save"]){
                    tweetSave = document.getElementById(`SaveElement-${save['plume_id']}`);
                    // console.log(tweetSave);        
                    if(tweetSave != null){
                        changeSave(save['plume_id']);
                        document.getElementById(`SaveText-${save['plume_id']}`).innerText = "Enregistré";
                    }
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
                    if(id[1]==preen.retweet_id){
                        tweet.children[2].children[2].children[0].innerText = preen.nb_preen;
                    }
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
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
            // console.log(responseComment);
            tweets = document.getElementsByClassName("tweet");
            for(tweet of tweets){
                let id = tweet.id.split("-");
                // console.log("id: "+id[1]);
                for(comment of responseComment){
                    if(id[1]==comment.answer_to){
                        // console.log("answer: "+comment.nb_comment);
                        tweet.children[2].children[1].children[0].innerText = comment.nb_comment;
                        // tweet.children[2].children[2].children[0].innerText = comment.nb_comment;
                    }
                }
            }
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteGetSave(){
    let user = logUser;
    httpRequestGetSave = new XMLHttpRequest();
    httpRequestGetSave.onreadystatechange = traitementGetSave;
    httpRequestGetSave.open('POST', 'api/savePlume.php/user', true);
    httpRequestGetSave.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user});
    httpRequestGetSave.send(data);
}
function traitementGetSave(){
    if (httpRequestGetSave.readyState === XMLHttpRequest.DONE) {
        if (httpRequestGetSave.status === 200) {
            ongletsMenu('save');
            document.getElementById("group-tweet").innerHTML = "";
            document.getElementById("save-container-centre").innerHTML = `<div id="no-save" class="none">Vous n'avez rien enregistré !</div>`;
            let response = JSON.parse(httpRequestGetSave.responseText);
            // console.log(response);
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
                    document.getElementById("save-container-centre").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span id="SaveText-${plume['id']}">Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="requeteSave(event)"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="${srcImage}">
                        </section>
                        <section class="tweet-icons">
                            <i id="HeartElement-${plume['id']}" class="fa-regular fa-heart" onclick="requeteLike(event)">&ensp;<span class="like">0</span></i>
                            <i class="fa-regular fa-comment">&ensp;<span class="comment">0</span></i>
                            <i id="RetweetElement-${plume['id']}" class="fas fa-retweet" onclick="changeRetweet()">&ensp;<span class="preen">0</span></i>
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
                },250);
                        });
            
        } 
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}


requeteGetFollower();
setTimeout(()=>{
    requeteStateLike();
    requeteNbLike();
    requeteNbPreen();
    requeteNbComment();
    setTimeout(()=>{
        requeteStateSave();
    },250);
});
