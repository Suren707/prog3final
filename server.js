let Grass = require("./modules/Grass.js");
let GrassEater = require("./modules/GrassEater.js");
let Predator = require('./modules/Predator.js');
let Beast = require('./modules/Beast.js');
let Dragon = require('./modules/Dragon.js');
let random = require("./modules/random");
var fs = require("fs");


matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
beastArr = [];
dragonArr = [];



weath = "winter";


function generator(matrixSize, grass, grassEater, predator, beast, dragon) {
    for (let i = 0; i < matrixSize; i++) {
      matrix.push([]);
      for (let j = 0; j < matrixSize; j++) {
        matrix[i].push(0);
      }
    }
    for (let i = 0; i < grass; i++) {
      const x = Math.round(Math.random() * (matrixSize -1));
      const y = Math.round(Math.random() * (matrixSize -1));
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y));
    }
    for (let i = 0; i < grassEater; i++) {
      const x = Math.round(Math.random() * (matrixSize -1));
      const y = Math.round(Math.random() * (matrixSize -1));
      matrix[y][x] = 2;
      grassEaterArr.push(new GrassEater(x, y));
    }
    for (let i = 0; i < predator; i++) {
      const x = Math.round(Math.random() * (matrixSize -1));
      const y = Math.round(Math.random() * (matrixSize -1));
      matrix[y][x] = 3;
      predatorArr.push(new Predator(x, y));
    }
    for (let i = 0; i < beast; i++) {
      const x = Math.round(Math.random() * (matrixSize -1));
      const y = Math.round(Math.random() * (matrixSize -1));
      matrix[y][x] = 4;
      beastArr.push(new Beast(x, y));
    }
    for (let i = 0; i < dragon; i++) {
      const x = Math.round(Math.random() * (matrixSize -1));
      const y = Math.round(Math.random() * (matrixSize -1));
      matrix[y][x] = 5;
      dragonArr.push(new Dragon(x, y));
    }
   

  }
generator(30, 1000, 100, 1, 5, 1);




// Return to this weather stuff

function weather() {
    if (weath == "winter") {
      weath = "spring";
    } else if (weath == "spring") {
      weath = "summer";
    } else if (weath == "summer") {
      weath = "autumn";
    } else if (weath == "autumn") {
      weath = "winter";
    }
    io.sockets.emit("weather", weath);
  }
  setInterval(weather, 5000);
  
//weather Stuff return to this//

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let beast = new Beast(x, y);
                beastArr.push(beast);
            }
            else if (matrix[y][x] == 5) {
                let dragon = new Dragon(x, y);
                dragonArr.push(dragon);
            }

        }
    }
}
    // io.sockets.emit("data", matrix)
    creatingObjects();

    // weather shit//
    function game() {
        if (grassArr[0] !== undefined) {
            if (weath != 'winter') {
                for (var i in grassArr) {
                    grassArr[i].mul();
                }
            }

        }
        if (grassEaterArr[0] !== undefined) {
            for (var i in grassEaterArr) {
                grassEaterArr[i].eat();
            }
        }
        if (predatorArr[0] !== undefined) {
            for (var i in predatorArr) {
                predatorArr[i].eat();
            }
        }
        if (beastArr[0] !== undefined) {
            for (var i in beastArr) {
                beastArr[i].eat();
            }
        }
        if (dragonArr[0] !== undefined) {
            for (var i in dragonArr) {
                dragonArr[i].eat();
            }
        }
        
    

        let sendData = {
            matrix: matrix,
            grassCounter: grassArr.length,
            grassEaterCounter: grassEaterArr.length,
            predatorCounter: predatorArr.length,
            beastCounter: beastArr.length,
            dragonCounter: dragonArr.length,
          
        
        };
    
    
        io.sockets.emit("data", sendData);
    
    
    
    
       
    }


    setInterval(game, 1000);

    function kill() {
        grassArr = [];
        grassEaterArr = []
        predatorArr = []
        beastArr = []
        dragonArr = []
        
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
}





function eatFunc(newX,newY){
    for (let j in grassArr) {
        if (grassArr[j].x == newX && grassArr[j].y == newY) {
            grassArr.splice(j, 1)
        }
    }
    for (let j in grassEaterArr) {
        if (grassEaterArr[j].x == newX && grassEaterArr[j].y == newY) {
            grassEaterArr.splice(j, 1)
        }
    }
    for (let j in predatorArr) {
        if (predatorArr[j].x == newX && predatorArr[j].y == newY) {
            predatorArr.splice(j, 1)
        }
    }
    for (let j in beastArr) {
        if (beastArr[j].x == newX && beastArr[j].y == newY) {
            beastArr.splice(j, 1)
        }
    }
    for (var j in dragonArr) {
        if (dragonArr[j].x == newX && dragonArr[j].y == newX) {
            dragonArr.splice(j, 1)
        }
    }
}


function Lightning() {

    let y = Math.floor(Math.random() * matrix.length - 1)
    let x = Math.floor(Math.random() * matrix[0].length - 1)



    if (y > 0 && x > 0) {

        for (let i in matrix) {

            if (y > matrix.length - 1 || x > matrix[0].length - 1) {
                break
            }
            matrix[y][x] = 7;
            eatFunc(x,y);
           
            y += 1;
            x += 1;

        }
    }
    io.sockets.emit("send matrix", matrix)
    setTimeout(function () {
        for (let y in matrix) {
            for (let x in matrix[y]) {
                if (matrix[y][x] == 7) {
                    matrix[y][x] = 0


                }
            }
        }
        io.sockets.emit("send matrix", matrix)
    }, 2000)
}




function bomb() {
    
   
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        beastArr = [];
        dragonArr = [];
        for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 8;
          }
        }
      
            io.sockets.emit("send matrix", matrix)
        
    }





// function addGrass() {
//     for (var i = 0; i < matrix.length; i++) {
//         var x = Math.floor(Math.random() * matrix[0].length -1)
//         var y = Math.floor(Math.random() * matrix.length -1)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 1
//             var grass = new Grass(x, y, 1)
//             grassArr.push(grass)
//         }
//     }
//     io.sockets.emit("send matrix", matrix);
// }
// function addGrassEater() {
//     for (var i = 0; i < 7; i++) {
//         var x = Math.floor(Math.random() * matrix[0].length)
//         var y = Math.floor(Math.random() * matrix.length)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 2
//             grassEaterArr.push(new GrassEater(x, y, 2))
//         }
//     }
//     io.sockets.emit("send matrix", matrix);
// }
// function addPredator() {
//     for (var i = 0; i < 7; i++) {
//         var x = Math.floor(Math.random() * matrix[0].length)
//         var y = Math.floor(Math.random() * matrix.length)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 3
//             predatorArr.push(new Predator(x, y, 3))
//         }
//     }
//     io.sockets.emit("send matrix", matrix);
// }








    
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("createLightning",Lightning);
    socket.on("createBomb", bomb);
    // socket.on("add grass", addGrass);
    // socket.on("add grassEater", addGrassEater);
    // socket.on("add predator", addPredator);

});





  

  

    // weather Shit///

    var statistics = {};

    setInterval(function () {
        statistics.grass = grassArr.length;
        statistics.grassEater = grassEaterArr.length;
        statistics.predator = predatorArr.length;
        statistics.beast = beastArr.length;
        statistics.dragon = dragonArr.length;

        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        })
    }, 1000)
    
