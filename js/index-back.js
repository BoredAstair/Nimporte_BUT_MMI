function requeteGetAll(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = traitementGetAll;
    httpRequest.open('GET', 'api/plume.php', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send();
}
function traitementGetAll(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
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
                    document.getElementById("group-tweet").innerHTML += `
                    <section class="tweet" id="id-${plume['id']}">
                        <section class="tweet-profil">
                            <section class="tweet-title">
                                <img src="${src}" classe="photo">
                                <h3>${plume['pseudo']}</h3>
                                <span>@${plume['user']}</span>
                            </section>
                            <section class="tweet-save">
                                <span>Enregistrer</span>&ensp;<i id="SaveElement-${plume['id']}" class="fa-regular fa-bookmark" onclick="changeSave()"></i>
                            </section>
                        </section>       
                        <section class="tweet-message">
                            <p>${plume['content']}</p>
                            <img id="" src="">
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
        else {
            alert('Il y a eu un problème avec la requête.');
        }
    }       
}

function requeteLike(e){
    let user = "nono";
    let plume = e.srcElement.id.split("-");
    httpRequestPostLike = new XMLHttpRequest();
    httpRequestPostLike.onreadystatechange = traitementLike;
    httpRequestPostLike.open('POST', 'api/like.php', true);
    httpRequestPostLike.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"user": user, "plume": plume[1]});
    httpRequestPostLike.send(data);
}
function traitementLike(){
    if (httpRequestPostLike.readyState === XMLHttpRequest.DONE) {
        if (httpRequestPostLike.status === 200) {
            responsePostLike = JSON.parse(httpRequestPostLike.responseText);
            // console.log(responsePostLike);
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
    httpRequestLike.open('GET', `api/plume.php/nb_like`, true);
    httpRequestLike.setRequestHeader("Content-Type", "application/json");
    httpRequestLike.send();
}
function traitementNbLike(){
    if (httpRequestLike.readyState === XMLHttpRequest.DONE) {
        if (httpRequestLike.status === 200) {
            responseLike = JSON.parse(httpRequestLike.responseText);
            console.log(responseLike);
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

function requeteNbPreen(){
    httpRequestPreen = new XMLHttpRequest();
    httpRequestPreen.onreadystatechange = traitementNbPreen;
    httpRequestPreen.open('GET', `api/plume.php/nb_preen`, true);
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
    httpRequestComment.open('GET', `api/plume.php/nb_comment`, true);
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


requeteGetAll();
setTimeout(()=>{
    requeteNbLike();
    requeteNbPreen();
    requeteNbComment();
});
