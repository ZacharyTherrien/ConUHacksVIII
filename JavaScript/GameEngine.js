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

let sprite = new Image();
sprite.src = "./animations/man/idle/1.png";
let zombies = 
[
]
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
        drawCharacter(sprite,0,player.yCoord);
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