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
    context.drawImage(gunSprite, x+9, y+34, 35, 35);
}

function SpawnZombies(sprite, x, y)
{
    context.drawImage(sprite, x, y, 55, 80);
}

function isWithinReach(){
    for (let i = 0; i < zombies.length; i++){
        if (player.yCoord <= zombies[i].yCoord+5 && player.yCoord >= zombies[i].yCoord - 5){
           zombies[i].dealDamage(player.strength);
        }
        if(zombies[i].hp <= 0){
            zombies[i] = null;
            zombies = arrayShift(zombies, i);
            break;
        }
    }
}