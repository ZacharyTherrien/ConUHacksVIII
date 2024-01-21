function TitleScreen(){
    context.font = "30px monospace";
    context.fillStyle = "white";
    context.fillText("Press \"Enter\" when ready...", 225, 100);
}

function GameOverScreen(){
    context.fillStyle = "red";
    context.font = "40px monospace";
    context.fillText("GAME OVER", 360, 100);
    context.fillStyle = "red";
    context.fillText("Press \"Enter\" to return to menu", 125, 150);
}

function drawCharacter(sprite, x, y){
    context.drawImage(sprite, x, y, 55, 80);
    context.drawImage(gunSprite, x+9, y+34, 35, 35);
}

function drawHpDamage(){
    if(hpDisplayCount > 0){
        context.font = "15px monospace";
        context.fillStyle = "red";
        context.fillText("-"+player.strength+"HP", hpX+10, hpY+20);
        hpDisplayCount--;
    }
}

function updatePlayerHpDisplay(){
    document.getElementById("HP-Display").innerHTML = player.hp;
}

function updateScoreDisplay(){
    document.getElementById("Score-Display").innerHTML = player.score;
}

function SpawnZombies(sprite, x, y)
{
    context.drawImage(sprite, x, y, 55, 80);
}

function isWithinReach(){
    for (let i = 0; i < zombies.length; i++){
        if (player.yCoord <= zombies[i].yCoord+5 && player.yCoord >= zombies[i].yCoord - 5){
            zombies[i].dealDamage(player.strength);
            zombies[i].xCoord += 15;
            hpX = zombies[i].xCoord;
            hpY = zombies[i].yCoord;
            hpDisplayCount = 50;
            player.score += 50;
        }
        if(zombies[i].hp <= 0){
            console.log("0")
            setTimeout(1000);
            console.log("1000!")
            zombies[i] = null;
            zombies = arrayShift(zombies, i);
            player.score += 1000;
            //The break statement will prevent piercing damage.
            break;
        }
        //window.setInterval(changeZombieDeathImage, 230);
    }
    updateScoreDisplay();
}