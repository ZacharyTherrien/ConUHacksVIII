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
let zombies = 
[
]

let zombieSpriteImage = 1;
let zombieSprite = new Image();
zombieSprite.src = "./animations/zombie/walking/1.png";

zombies.push(
    {
        sprite: zombieSprite,
        start: canvas.width,
        position: getRandomInt(5) * 80,
        speed: getRandomInt(2) + 1
    }
)

function changeCharacterImage()
{
    switch (characterSpriteImage)
    {
        case 1:
            sprite.src = "./animations/man/idle/2.png";
            characterSpriteImage = 2;
            break;
        case 2:
            sprite.src = "./animations/man/idle/3.png";
            characterSpriteImage = 3;
            break;
        case 3:
            sprite.src = "./animations/man/idle/4.png";
            characterSpriteImage = 4;
            break;
        case 4:
            sprite.src = "./animations/man/idle/1.png";
            characterSpriteImage = 1;
            break;
    }
}
function changeCharacterWalkingImage()
{
    switch (characterWalkingSpriteImage)
    {
        case 1:
            sprite.src = "./animations/man/walking/2.png";
            characterWalkingSpriteImage = 2;
            break;
        case 2:
            sprite.src = "./animations/man/walking/3.png";
            characterWalkingSpriteImage = 3;
            break;
        case 3:
            sprite.src = "./animations/man/walking/4.png";
            characterWalkingSpriteImage = 4;
            break;
        case 4:
            sprite.src = "./animations/man/walking/5.png";
            characterWalkingSpriteImage = 5;
            break;
        case 5:
            sprite.src = "./animations/man/walking/6.png";
            characterWalkingSpriteImage = 6;
            break;
        case 6:
            sprite.src = "./animations/man/walking/7.png";
            characterWalkingSpriteImage = 7;
            break;
        case 7:
            sprite.src = "./animations/man/walking/8.png";
            characterWalkingSpriteImage = 8;
            break;
        case 8:
            sprite.src = "./animations/man/walking/1.png";
            characterWalkingSpriteImage = 1;
            break;
    }
}
function changeZombieImage()
{
    switch (zombieSpriteImage)
    {
        case 1:
            zombieSprite.src = "./animations/zombie/walking/2.png";
            zombieSpriteImage = 2;
            break;
        case 2:
            zombieSprite.src = "./animations/zombie/walking/3.png";
            zombieSpriteImage = 3;
            break;
        case 3:
            zombieSprite.src = "./animations/zombie/walking/4.png";
            zombieSpriteImage = 4;
            break;
        case 4:
            zombieSprite.src = "./animations/zombie/walking/1.png";
            zombieSpriteImage = 1;
            break;
    }
}

window.setInterval(function() {
    zombies.push(
        {
            sprite: zombieSprite,
            start: canvas.width,
            position: getRandomInt(5) * 80,
            speed: getRandomInt(2) + 1
        }
    )
}, getRandomInt(10000) + 10000)

window.setInterval(changeCharacterWalkingImage, 100)

window.setInterval(changeZombieImage, 50)
function animate()
{
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
    else if(gameState == GameStates.Running)
    {
        drawLines();
        drawCharacter(sprite, 0, player.yCoord);
        for (let i = 0; i < zombies.length; i++)
        {
            zombies[i].start -= zombies[i].speed;
            SpawnZombies(zombies[i].sprite, zombies[i].start, zombies[i].position);
        }

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