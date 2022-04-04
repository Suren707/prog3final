
var Lifeform = require("./Lifeform");
var random = require("./random");


module.exports = class GrassEater extends Lifeform {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);


        if (newCell && this.energy >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            grassEaterArr.push(new GrassEater(newX, newY));
            this.energy = 5;
        }
    }
    //     if (weath == "winter") {
    //         this.energy -= 4;
    //         this.multiply -= 4;
    //     }
    //     if (weath == "summer") {
    //         this.energy += 2;
    //         this.multiply += 2;
    //     }
    // }
    eat() {
        var found = this.chooseCell(1);
        var newCell = random(found);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
            }
        }
            if (this.energy >= 5) {
                this.mul();
            }
        }

        else {
            this.move();
        }
    }
    move() {
        
        var found = this.chooseCell(0);
        var newCell = random(found);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

