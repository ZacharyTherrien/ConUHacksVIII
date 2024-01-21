let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let gameState;
let ratio = 100;
let width = 9 * ratio;
let height = 4 * ratio;
canvas.width = width;
canvas.height = height;
let grassHeight = 50;
let key = "";

const GameStates = {
    Title: "title",
    Running: "running",
    Over: "game over",
    End: "End"
}

gameState = GameStates.Start;

document.querySelector("html").onkeypress = function(press){
    key = press.key;
}
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,width,height);
    context.fillStyle = "rgba(0,102,0)";
    context.fillRect(0,height-grassHeight,width,height);
    if(gameState == GameStates.Start){
        TitleScreen();
        if(key == "Enter"){
            alert("Game, start!");
            gameState = GameStates.Running;
        }
    }
    else if(gameState == GameStates.Running){
        if(key == "w"){
            alert(key);
        }
        else if(key  == "a"){
            alert(key);
        }
        else if(key  == "s"){
            alert(key);
        }
        else if(key  == "d"){
            alert(key);
        }
        else if(key  == "1"){
            gameState = GameStates.Over;
            GameOverScreen();
            alert("End of game");
        }
    }
    else if(gameState == GameStates.Over){
        alert("Returning to start...");
        gameState = GameStates.Start;
    }
    key = '';
}
animate();