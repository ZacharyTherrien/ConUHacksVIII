const startHp = 100;
const alive = true;
const startingX = 0;
const startingY;
const monsterStrength = 10;
let monstersOnMap = [];

class Monster{
    constructor(weapon){
        this.hp = startHp;
        this.weapon = new Weapon();
        this.status = alive;
        this.xCoord = startingX;
        this.yCoord = startingY;
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
                let filtered = monstersOnMap.filter(zombie => zombie !== 3);
                console.log(filtered);
            }
        }else{
            this.hp -= damage;
        } 
    }

    //need to revisit
    walk(key){
        if (key == "d"){
            if (this.xCoord < MAX X COORD){
                this.xCoord +=1;
            }else{
                this.xCoord = startingX;
            }
        }else if (key == "a"){
            if (this.xCoord > 0){
                this.xCoord -= 1;
            }else{
                this.xCoord = MAX X COORD;
            }
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
            if (this.human ){
                monster.takeDamage(this.weapon.strength); 
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
                }
            }
            return this.attack(zombieTarget);
        }
    }


}