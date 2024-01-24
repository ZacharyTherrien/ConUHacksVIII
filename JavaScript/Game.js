let damageLaunch = 15;

function TitleScreen(){
    drawCharacter(sprite, titlePlayerX, titlePlayerY);
    titlePlayerX++;
    if(titlePlayerX > canvas.width + 20){
        titlePlayerX = -10;
    }
    SpawnZombies(zombieSprite, titleZombieX, titleZombieY);
    titleZombieX++;
    if(titleZombieX > canvas.width + 20){
        titleZombieX = -30;
    }
    //Draw the difficulty on top of the player and zombies on title screen.
    context.font = "25px monospace";
    context.fillStyle = "white";
    context.fillText("Choose your difficulty and press \"Enter\" when ready...", 75, 100);
    context.fillStyle = difficulty == 1 ? "DeepSkyBlue" : "white";
    context.fillText("1. Easy", 300, 150);
    context.fillStyle = difficulty == 2 ? "red" : "white";
    context.fillText("2. Hard", 500, 150);
}

function GameOverScreen(){
    context.fillStyle = "red";
    context.font = "40px monospace";
    context.fillText("GAME OVER", 360, 100);
    context.fillStyle = "red";
    context.fillText("Press \"Enter\" to return to menu", 125, 150);
    titlePlayerX = 0;
    titlePlayerY = 240;
    titleZombieX = 80;
    titleZombieY = 240;
}

function drawCharacter(sprite, x, y){
    context.drawImage(sprite, x, y, 55, 80);
    context.drawImage(gunSprite, x + 9, y + 34, 35, 35);
}

function drawHpDamage(){
    if(hpDisplayCount > 0){
        context.font = "15px monospace";
        context.fillStyle = "red";
        context.fillText("-"+player.strength+"HP", hpX+10, hpY+20);
        hpDisplayCount--;
    }
}

function drawLines(){
    context.strokeStyle = "white";
    for(let i = 0; i < 5; i++){
        context.beginPath();
        context.setLineDash([25, 25]);
        context.moveTo(0, 80 + (i * 80));
        context.lineTo(canvas.width, 80 + (i * 80));
        context.stroke();
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

function SpawnDeadZombies(sprite, x, y)
{
    //The death sprite's center is ~75 pixels away from zombie's walking sprite.
    //So it needs to be moved 5 times the launch distance to have it placed at the spot.
    context.drawImage(sprite, x - (damageLaunch * 5), y, 110, 80);
}

function isWithinReach(){
    for (let i = 0; i < zombies.length; i++)
    {
        if (zombies[i].isAlive && player.yCoord <= zombies[i].yCoord + (30 / difficulty) && player.yCoord >= zombies[i].yCoord - (30 / difficulty))
        {
            zombies[i].dealDamage(player.strength);
            zombies[i].xCoord += damageLaunch;
            hpX = zombies[i].xCoord;
            hpY = zombies[i].yCoord;
            hpDisplayCount = 50;
            player.score += 50;
            if(!zombies[i].isAlive){
                player.score += 1000;
                //window.clearInterval(deathInterval);
                //zombies[i] = null;
                //zombies = arrayShift(zombies, i);
            }
            //This break statement will prevent zombies in the same row from getting hit.
            break;
        }
    }
    updateScoreDisplay();
}