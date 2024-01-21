let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let gameState;
let ratio = 100;
canvas.width = 9 * ratio;
canvas. height = 4 * ratio;
let key = "";
let player;

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

if (hours == 3)
    zombieSprite.src = "./animations/zombie/special/1.png";
else
    zombieSprite.src = "./animations/zombie/walking/1.png";

let gunSprite = new Image();
gunSprite.src = "./animations/Pistol.png";

// zombies.push(
//     {
//         sprite: zombieSprite,
//         start: zombieSprite,
//         position: getRandomInt(5) * 80,
//         speed: getRandomInt(2) + 1
//     }
// )
zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1));

function changeCharacterImage()
{
    characterSpriteImage++;
    if (characterSpriteImage == 5) characterSpriteImage = 1;
    let pngString = characterSpriteImage + ".png"
    sprite.src = "./animations/man/idle/" + pngString;
}
function changeCharacterWalkingImage()
{
    characterWalkingSpriteImage++;
    if (characterWalkingSpriteImage == 9) characterWalkingSpriteImage = 1;
    let pngString = characterWalkingSpriteImage + ".png"
    sprite.src = "./animations/man/walking/" + pngString;
}
function changeZombieImage()
{
    zombieSpriteImage++;
    if (zombieSpriteImage == 5) zombieSpriteImage = 1;
    let pngString = zombieSpriteImage + ".png"
    zombieSprite.src = (hours == 3) ?
     "./animations/zombie/special/" + pngString : 
     "./animations/zombie/walking/" + pngString;
}

window.setInterval(() => {zombies.push(new Zombie(zombieSprite, getRandomInt(5) * 80, getRandomInt(2) + 1))}, getRandomInt(10000) + 10000)

window.setInterval(changeCharacterImage, 100)

window.setInterval(changeZombieImage, 50)
function animate()
{
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    if(gameState == GameStates.Start){
        TitleScreen();
        if(key == "Enter"){
            gameState = GameStates.Running;
            player = new Player();
        }
    }
    else if(gameState == GameStates.Running)
    {
        drawLines();
        drawCharacter(sprite, 0, player.yCoord);

        let disappearingZombies = null;
        for (let i = 0; i < zombies.length; i++)
        {
            zombies[i].xCoord -= zombies[i].speed;
            if (zombies[i].xCoord <= 30)
                disappearingZombies = i;
            SpawnZombies(zombies[i].sprite, zombies[i].xCoord, zombies[i].yCoord);
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
            this.isWithinReach();
        }
    }
    else if(gameState == GameStates.Over){
        alert("Returning to start...");
        gameState = GameStates.Start;
    }
    key = '';
}
animate();

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