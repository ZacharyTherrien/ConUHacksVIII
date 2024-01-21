const STARTHP = 10;
const STARTINGX = 0;
const STARTINGY = 0;
let monsterStrength = 10;
let monstersOnMap = [];

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
            if (this.hp <= damage){
                this.status = false;
                gameState = GameStates.Over;
                // }else{
                //     //MONSTER DIES
                //     let filtered = monstersOnMap.filter(zombie => zombie.strength == 0);
                //     monstersOnMap = filtered;
                // }
            }
        }
    }

    dealDamage(damage = 1){
        this.hp-= damage;
        if(this.hp <= 0)
            this.isAlive = false;
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
                monster.takeDamage(); 
                //bullets decreasing?
                //this.weapon.ammo -= 1;  
            }else{
                this.takeDamage(monster.strength);
            }
        }
    }

    reachOfBullet(monster){
        let min = this.xCoord;
        let zombieTarget;
        if (monstersOnMap.length != 0){
            for (const zombie of monstersOnMap){
                let distance = this.xCoord - zombie.xCoord
                if (min > distance){
                    min = distance;
                    zombieTarget = zombie;
                    zombieTarget.strength = 0;
                }
            }
            this.attack(zombieTarget);
        }
    }
}

class Player extends Monster{
    constructor(){
        super();
        this.isHuman = true; 
        this.strength = 5;
    }
}

class Zombie extends Monster{
    constructor(yCoord, speed, sprite){
        super();
        this.yCoord = yCoord;
        this.xCoord = canvas.width;
        this.strength = 1;
        this.speed = speed;
        this.sprite = sprite;
    }
}