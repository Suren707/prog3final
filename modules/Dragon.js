let LifeForm = require('./LifeForm')
var random = require("./random.js");

module.exports = class Dragon extends LifeForm {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 50;
        this.directions = [];
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

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            dragonArr.push(new Dragon(newX, newY));
            this.energy = 5;
        }
    }

    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {
        var found = this.chooseCell(2,3,4);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
            }
        }
        for (var i in predatorArr) {
            if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
        }
    }
        for (var i in beastArr) {
            if (newX == beastArr[i].x && newY == beastArr[i].y) {
                beastArr.splice(i, 1);
                break;
        }
    }
            if (this.energy >= 30) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    die() {
        for (var i in dragonArr) {
            if (this.x == dragonArr[i].x && this.y == dragonArr[i].y) {
                dragonArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}