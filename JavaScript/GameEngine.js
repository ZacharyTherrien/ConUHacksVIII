let canvas;
let context;
let gameState;
let width;
let height;

const GameStates = {
    Title: "title",
    Running: "running",
    Over: "game over",
    End: "End"
}

gameState = GameStates.Start;

document.querySelector("html").onkeypress = function(press){
    if(gameState == GameStates.Start){
        if(press.key == "Enter"){
            alert("Game, start!");
            gameState = GameStates.Running;
        }
    }
    else if(gameState == GameStates.Running){
        if(press.key == "w"){
            alert(press.key);
        }
        else if(press.key  == "a"){
            alert(press.key);
        }
        else if(press.key  == "s"){
            alert(press.key);
        }
        else if(press.key  == "d"){
            alert(press.key);
        }
        else if(press.key  == "1"){
            gameState = GameStates.Over;
            alert("End of game");
        }
    }
    else if(gameState == GameStates.Over){
        alert("Returning to start...");
        gameState = GameStates.Title;
    }
}

function SetupCanvas(){
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    let ratio = 100;
    width = 9 * ratio;
    height = 4 * ratio;
    canvas.width = width;
    canvas.height = height;
    // canvas.style.height = height;
    // canvas.style.width = width;
}

function Draw(){
    context.clear(0,0,width,height);
}

SetupCanvas();