var Lifeform = require("./Lifeform");
var random = require("./random.js");

module.exports = class Grass extends Lifeform {
  
    mul() {
    
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
        this.multiply++;
    }
  
  }

