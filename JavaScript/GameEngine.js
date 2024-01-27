let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let gameState;
let ratio = 100;
canvas.width = 9 * ratio;
canvas.height = 4 * ratio;
let key = "";
let player;
let hpDisplayCount = 0;
let hpX;
let hpY;
let difficulty = 1;
let titlePlayerX = 0;
let titlePlayerY = 240;
let titleZombieX = 80;
let titleZombieY = 240;
let fireRate = 0;

var objDate = new Date();
var hours = objDate.getHours();

const GameStates = {
    Title: "title",
    Running: "running",
    Over: "game over",
    End: "End"
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

gameState = GameStates.Start;

document.querySelector("html").onkeypress = function(press){
    key = press.key;
}

let characterSpriteImage = 1;
let characterWalkingSpriteImage = 1;
let sprite = new Image();
sprite.src = "./animations/man/idle/1.png";
let zombies = []

let zombieSpriteImage = 1;
let zombieSprite = new Image();

//Best reference ever, thx, Sean. :teary_eyes:
if (hours == 3)
    zombieSprite.src = "./animations/zombie/special/1.png";
else
    zombieSprite.src = "./animations/zombie/walking/1.png";

let gunSprite = new Image();
gunSprite.src = "./animations/Pistol.png";

zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1));

function changeCharacterImage()
{
    characterSpriteImage++;
    if (characterSpriteImage == 5) 
        characterSpriteImage = 1;
    let pngString = characterSpriteImage + ".png";
    sprite.src = "./animations/man/idle/" + pngString;
}
function changeCharacterWalkingImage()
{
    characterWalkingSpriteImage++;
    if (characterWalkingSpriteImage == 9) 
        characterWalkingSpriteImage = 1;
    let pngString = characterWalkingSpriteImage + ".png";
    sprite.src = "./animations/man/walking/" + pngString;
}
function changeZombieImage()
{
    zombieSpriteImage++;
    if (zombieSpriteImage == 5) 
        zombieSpriteImage = 1;
    let pngString = zombieSpriteImage + ".png";
    zombieSprite.src = (hours == 3) ?
     "./animations/zombie/special/" + pngString : 
     "./animations/zombie/walking/" + pngString;
}

window.setInterval(() => {
    let doubleZombies = getRandomInt(100) / difficulty;
    zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))

    if (doubleZombies <= 70)
        zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))
    
    if (doubleZombies <= 45)
        zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))

    if (doubleZombies <= 20)
        zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))

    if (doubleZombies <= 5)
        zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))

}
, getRandomInt(10000) + 4000);

window.setInterval(changeZombieImage, 50);
let characterWalkingInterval = setInterval(changeCharacterWalkingImage, 100);
let characterIdleInterval;

function animate()
{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(gameState == GameStates.Start){
        TitleScreen();
        drawLines();
        if(key == "Enter"){
            gameState = GameStates.Running;
            clearInterval(characterWalkingInterval);
            zombies = [];
            player = new Player(sprite);
            updatePlayerHpDisplay();
            updateScoreDisplay();
            characterIdleInterval = setInterval(changeCharacterImage, 100);
        }
        else if(key == "1"){
            difficulty = 1;
        }
        else if(key == "2"){
            difficulty = 2;
        }
    }
    else if(gameState == GameStates.Running)
    {
        drawLines();
        drawCharacter(player.sprite, 0, player.yCoord);
        drawHpDamage();
        if(fireRate > 0)
            fireRate--;
        let disappearingZombies = null;
        for (let i = 0; i < zombies.length; i++)
        {
            //Update zombies' position.
            if (zombies[i].hp > 0)
                zombies[i].xCoord -= (zombies[i].speed + (zombies[i].hp / 9) - difficulty);
            //If they reached the left side, deal damage to player.
            if (zombies[i].xCoord <= 35){
                disappearingZombies = i;
                player.takeDamage(1);
                context.fillStyle = "Red";
                playSound("hurt");
                context.fillRect(0, 0, canvas.width, canvas.height);
                //context.drawImage("./claw.png", 0, 0);
                updatePlayerHpDisplay();
            }
            //Display the zombies.
            //if (zombies[i].hp > 0)
            if(zombies[i].isAlive){
                SpawnZombies(zombies[i].sprite, zombies[i].xCoord, zombies[i].yCoord);
            }
            else{
                SpawnDeadZombies(zombies[i].sprite, zombies[i].xCoord, zombies[i].yCoord);
                if(zombies[i].deathAnimationCounter++ > 100){            
                    zombies[i] = null;
                    zombies = arrayShift(zombies, i);
                }
            }
            //else SpawnDeadZombies(zombies[i].sprite, zombies[i].xCoord, zombies[i].yCoord)
        }
        if (disappearingZombies != null) zombies.splice(disappearingZombies, 1);

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
        else if(key == ' '){
            //Change gun for muzzle flash gun animation here! >:)
            if(fireRate <= 0){
                playSound("gunshot", 2);
                context.fillStyle = "White";
                context.fillRect(0, 0, canvas.width, canvas.height);
                this.isWithinReach();
                fireRate = 25;
            }
        }
    }
    else if(gameState == GameStates.Over){
        GameOverScreen();
        drawLines();
        clearInterval(characterIdleInterval);
        if(key == "Enter"){
            gameState = GameStates.Start;
            characterWalkingInterval = setInterval(changeCharacterWalkingImage, 100);
        }
    }
    key = '';
}
animate();
initializaSounds();