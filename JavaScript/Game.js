function TitleScreen(){
    context.fillStyle = "white";
    context.fillText("Press \"Enter\" to start", 200, 100);
}

function GameOverScreen(){
    context.fillStyle = "red";
    context.fillText("GAME OVER", 200, 100);
}

function drawCharacter(sprite, x, y){
    context.drawImage(sprite, x, y, 55, 80);
}

function SpawnZombies(sprite, x, y)
{
    context.drawImage(sprite, x, y, 55, 80);
}

function isWithinReach(){
for (let i = 0; i < zombies.length; i++){
    if (player.yCoord <= zombies[i].yCoord+5 && player.yCoord >= zombies[i].yCoord - 5){
        alert("Shot");
    }
}
}