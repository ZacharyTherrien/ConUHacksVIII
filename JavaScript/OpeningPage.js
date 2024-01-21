document.getElementById("start-button").addEventListener("click", function() {
//document.getElementById("game-canvas").style.display = "none";
document.getElementById("game-container").style.display = "block";
document.getElementById("opening-page").style.display = "none";
isRunning();

    });

function isRunning(){
    
    gameState = GameStates.Running;
    player = new Player();

}
