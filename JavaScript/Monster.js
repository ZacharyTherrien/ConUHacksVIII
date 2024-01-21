const startHp = 100;
const startAmmunition = 10;
const alive = true;
const startingX = 0;
const startingY;

class Monster{
    constructor(weapon){
        this.hp = startHp;
        this.weapon = weapon;
        this.ammo = startAmmunition;
        this.status = alive;
        this.xCoord = startingX;
        this.yCoord = startingY;
        this.human = false;
    }

    takeDamage(damage){
        if (this.hp <= damage){
            this.status = false;
            //GAME ENDS
        }else{
            this.hp -= damage;
        } 
    }

    walk(key){
        if (key == "d"){
            if (this.xCoord < MAX X COORD){
                this.xCoord +=1;
            }else{
                re
            }
        }else if (key == "a"){
            if (this.xCoord > 0){
                this.xCoord -= 1;
            }else{
                return;
            }
        }
    }

    isHuman(monster){
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
            if (this.human){
                monster.hp -= this.
            }
        }
    }


}