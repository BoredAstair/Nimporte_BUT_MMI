urlCourante = "";
for(url of document.location.href.split("/")){
    if(url != "index.html"){
        urlCourante += url+"/";
    }
}
function getdatarequest(){
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = getdatatraitement;
    httpRequest.open('GET', `http://localhost/Nimporte_BUT_MMI/api/getData.php?userID=${localStorage.getItem('userID')}`, true);
    httpRequest.send();
}

function getdatatraitement(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            document.getElementById("username").value = "@" + response[0]["username"];
            document.getElementById("pseudo").value = response[0]["pseudo"];
            document.getElementById("email").value = response[0]["mail"];
            if(response[0]["pp"]){
                document.getElementById("default-profile").src = `upload/profile/${response[0]["pp"]}`;
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

//-----

function reqsetdata(){
    let pseudo = document.getElementById("pseudo").value;
    if(document.getElementById("bio").value){
        let bio = document.getElementById("bio").value
    };
    if (document.getElementById('avatar').files[0] != null){
        uploadFile("avatar");
        let avatar = document.getElementById("avatar").value;
    }
    if (document.getElementById('banner').files[0] != null){
        uploadFile("banner");
        let banner = document.getElementById("banner").value;
    }

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = getdatatraitement;
    httpRequest.open('POST', `${urlCourante}api/setData.php`, true);
    data = JSON.stringify({"pseudo": pseudo, "bio": bio, "avatar": avatar, 'banner':banner});
    httpRequest.send(data);
}

async function uploadFile(type) {

    //based of https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example

    let formData = new FormData(); 
    if(type == "banner"){
        formData.append("banner", banner.files[0]);
    } else if (type == "avatar"){
        formData.append("avatar", avatar.files[0]);
    }
    formData.append("type", type);
    let loca = "profile";
    await fetch(`${urlCourante}api/upload.php`, {
      method: "POST", 
      body: formData
    }).then( response => response.ok ? response.json() : "ERROR LOADING" )
    .then( data => console.log(data) );
}