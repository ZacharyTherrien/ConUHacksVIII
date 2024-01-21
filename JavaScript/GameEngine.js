let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let gameState;
let ratio = 100;
let width = 9 * ratio;
let height = 4 * ratio;
canvas.width = width;
canvas.height = height;
let key = "";
let player;

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
            player = new Player();
        }
    }
    else if(gameState == GameStates.Running){
        drawCharacter(sprite,0,player.yCoord);
        if(key == "w"){
            player.walk(key);
        }
        else if(key  == "a"){
            player.walk(key);
        }
        else if(key  == "s"){
            player.walk(key);
        }
        else if(key  == "d"){
            player.walk(key);
        }
        else if(key  == "1"){
            gameState = GameStates.Over;
            GameOverScreen();
        }
    }
    else if(gameState == GameStates.Over){
        alert("Returning to start...");
        gameState = GameStates.Start;
    }
    key = '';
}
animate();