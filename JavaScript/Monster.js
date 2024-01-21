const STARTHP = 15;
const STARTINGX = 0;
const STARTINGY = 0;
let monsterStrength = 1;

class Monster{
    constructor(){
        this.hp = STARTHP;
        this.isAlive = true;
        this.xCoord = STARTINGX;
        this.yCoord = STARTINGY;
        this.isHuman = false;
        this.strength = monsterStrength;
    }

    takeDamage(damage){
        if(this.isHuman){
            this.hp--;
            if (this.hp <= 0){
                this.isAlive = false;
                gameState = GameStates.Over;
                GameOverScreen();
            }
        }
    }

    dealDamage(damage = 1){
        this.hp -= damage;
        this.isAlive = false;
        return this.hp <= 0;
    }

    //need to revisit
    walk(key){
        if (key == "a" || key == "s"){
            this.yCoord +=10;
        }else if (key == "d" || key == "w"){
            this.yCoord -= 10;
        }
        if(this.yCoord > canvas.height - 40){
            this.yCoord = -50;
        }
        else if(this.yCoord < -50){
            this.yCoord = canvas.height - 40;
        }
    }
    
    attack(monster){
        //two zombies colliding
        if (this.isHuman(monster)){
            return;
        }else{
            //if the human is attacking
            if (this.isHuman){
                monster.dealDamage(); 
                //bullets decreasing?
                //this.weapon.ammo -= 1;  
            }else{
                this.takeDamage(monster.strength);
            }
        }
    }

}

class Player extends Monster{
    constructor(){
        super();
        this.hp = 3;
        this.isHuman = true; 
        this.strength = 5;
        this.score = 0;
    }
}

class Zombie extends Monster{
    constructor(sprite, row, speed){
        super();
        this.sprite = sprite;
        this.STARTINGX = canvas.width;
        this.yCoord = row;
        this.speed = speed;
        this.xCoord = this.STARTINGX;
    }
}