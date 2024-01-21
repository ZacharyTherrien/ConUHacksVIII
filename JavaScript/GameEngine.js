let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let gameState;
let ratio = 100;
let width = 9 * ratio;
let height = 4 * ratio;
canvas.width = width;
canvas.height = height;
let key = "";

const GameStates = {
    Title: "title",
    Running: "running",
    Over: "game over",
    End: "End"
}

let sprite = new Image();
sprite.src = "./animations/man/idle/1.png";
drawCharacter(sprite,0,0);

gameState = GameStates.Start;

document.querySelector("html").onkeypress = function(press){
    key = press.key;
}
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,width,height);
    if(gameState == GameStates.Start){
        TitleScreen();
        if(key == "Enter"){
            alert("Game, start!");
            gameState = GameStates.Running;
        }
    }
    else if(gameState == GameStates.Running){
        drawCharacter(sprite,0,0);
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