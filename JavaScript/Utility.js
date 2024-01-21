function arrayShift(arr, pos){
    for(let i = pos + 1; i < arr.length; i++){
        arr[i - 1] = arr[i];
    }
    arr[arr.length - 1] = null;
    let newArr = [];
    for(let i = 0; i < arr.length - 1; i++){
        newArr[i] = arr[i];
    }
    return newArr;
}

function initializaSounds(){
    sounds = {
        hurt: new Audio("sounds/playerHurt.wav"),
        gunshot: new Audio("sounds/9mm_pistol.mp3"),
    };
}

function playSound(name, playRate = 1){
    sounds[name].currentTime = 0;
    sounds[name].playbackRate = playRate;
    sounds[name].play();
}