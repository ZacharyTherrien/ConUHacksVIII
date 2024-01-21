const STARTHP = 100;
let alive = true;
const STARTINGX = 0;
const STARTINGY = 0;
let monsterStrength = 10;
let monstersOnMap = [];
const MAXYCOORD = canvas.height;

class Monster{
    constructor(){
        this.hp = STARTHP;
        this.status = alive;
        this.xCoord = STARTINGX;
        this.yCoord = STARTINGY;
        this.human = false;
        this.strength = monsterStrength;
    }

    takeDamage(damage){
        if (this.hp <= damage){
            this.status = false;
            if (this.human){
                //GAME ENDS
                return;
            }else{
                //MONSTER DIES
                let filtered = monstersOnMap.filter(zombie => zombie.strength == 0);
                monstersOnMap = filtered;
            }
        }else{
            this.hp -= damage;
        } 
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

    isHuman(monster){
        //zombie and human
        if (this.isHuman =! monster.isHuman){
            return false;
        }else{
            return true;
        }
    }
    
    attack(monster){
        //two zombies colliding
        if (this.isHuman(monster)){
            return;
        }else{
            //if the human is attacking
            if (this.human){
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
        this.human = true; 
        this.strength = 0;
    }
}