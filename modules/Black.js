var Lifeform = require("./Lifeform");


module.exports = class Black extends Lifeform {
    constructor(x, y) {
        super(x, y);
        this.life = 60;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < blackArr.length; index++) {
            if (blackArr[index].x == this.x && blackArr[index].y == this.y) {
                blackArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(2).concat(this.chooseCell(4)));
        if (newCell) {
            this.energy += 50;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        {

            }
            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                    let a = new Predator(x,y);
                    predatorArr.push(a);
                }
            }
            for (let index = 0; index < killerArr.length; index++) {
                if (killerArr[index].x == x && killerArr[index].y == y) {
                    killerArr.splice(index,1)
                    let a = new Predator(x,y);
                    predatorArr.push(a);
                }
            }



            if (this.energy > 60) {
                this.move()
            }

        }
        else { this.move() }
    }




    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;


        }
        if (newCell && this.energy < 0) {
            this.die();
        }
        if (this.energy < 0) {
            this.die();
        }
    }
}