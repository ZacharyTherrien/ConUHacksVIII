function TitleScreen(){
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
    context.drawImage(sprite, x, y, 100, 100);
}

function isWithinReach(){
    for (let i = 0; i < zombies.length; i++)
    {
        if (!(zombies[i].hp <= 0))
        {
            if (player.yCoord <= zombies[i].yCoord + 5 && player.yCoord >= zombies[i].yCoord - 5)
            {
                zombies[i].dealDamage(player.strength);
                zombies[i].xCoord += 15;
                hpX = zombies[i].xCoord;
                hpY = zombies[i].yCoord;
                hpDisplayCount = 50;
                player.score += 50;
            }
        }
        if(zombies[i].hp <= 0){
            //zombieDeathSpriteImage = 1;
            /*let deathInterval = window.setInterval(() => 
            {
                console.log(zombies[i].sprite.src)
                zombieDeathSpriteImage++;
                if(zombieDeathSprite == 23) zombieDeathSpriteImage = 23;
                let pngString = zombieDeathSprite + ".png";
                zombies[i].sprite.src = "./animations/zombie/death/" + pngString;
            }, 100);*/
            //setTimeout(() => 
            //{
                player.score += 1000;
                //window.clearInterval(deathInterval);
                zombies[i] = null;
                zombies = arrayShift(zombies, i);
            //}, 4000);
            //The break statement will prevent piercing damage.
            break;
        }
        //window.setInterval(changeZombieDeathImage, 230);
    }
    updateScoreDisplay();
}