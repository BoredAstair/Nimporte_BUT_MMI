function changeSave() {
    var SaveElement = document.getElementById("SaveElement");
    SaveElement.classList.toggle("fa-regular");
    SaveElement.classList.toggle("fa-solid");
}

function changeHeart() {
    var HeartElement = document.getElementById("HeartElement");
    HeartElement.classList.toggle("fa-regular");
    HeartElement.classList.toggle("fa-solid");
}

function changeRetweet() {
    var retweetElement = document.getElementById("RetweetElement");
    retweetElement.classList.toggle("rotate");
}

function DoTweet() {
    const popupContainer = document.querySelector('.popup-container');
    const tweetForm = document.createElement('form');
    popupContainer.appendChild(tweetForm);
    popupContainer.style.display = 'flex';
}

function closeTweetPopup(e){
    const element = e.srcElement;
    if(element.classList.contains("popup-container")){
      const popupContainer = document.querySelector('.popup-container');
      popupContainer.innerHTML = '';
      popupContainer.style.display = 'none';
    }
}  

function textCounter(champ, champ2, maxlimit) {
    var countchamp = document.getElementById(champ2);
    if (champ.value.length > maxlimit) {
      champ.value = champ.value.substring(0, maxlimit);
      return false;
    } else {
      countchamp.value = maxlimit - champ.value.length;
    }
}

function insertImage() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            document.getElementById('image').src = reader.result;
        };
    };
    input.click();
}
