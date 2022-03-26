let Grass = require("./modules/Grass.js");
let GrassEater = require("./modules/GrassEater.js");
let Predator = require('./modules/Predator.js');
let Killer = require('./modules/KIller.js');
let Black = require('./modules/Black.js');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
killerArr = [];
blackArr = [];
matrix = [];

function setup() {
    matrixGenerator(50, 10000, 100,10,15,1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('grey');
    frameRate(5);
     
    noStroke();

    function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, killerCount,blackCount) {
        for (let index = 0; index < matrixSize; index++) {
            matrix[index] = [];
            for (let i = 0; i < matrixSize; i++) {
                matrix[index][i] = 0;
            }
        }
        for (let index = 0; index < grassCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 1;
        }
        for (let index = 0; index < grassEaterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 2;
        }
        for (let index = 0; index < predatorCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 3;
        }
        for (let index = 0; index < killerCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 4;
        }
        for (let index = 0; index < blackCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 5;
        }
    }

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
                let killer = new Killer(x, y);
                killerArr.push(killer);
            }
            else if (matrix[y][x] == 5) {
                let black = new Black(x, y);
                blackArr.push(black);
            }
           
        }
    }

}
// Return to this weather stuff

// function draw() {

//     for (let y = 0; y < matrix.length; y++) {
//         const element = matrix[y];
//         for (let x = 0; x < element.length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill('rgb(96, 139, 96)')
//                 rect(x * side, y * side, side, side)
//             }
//             else if (matrix[y][x] == 2) {
//                 fill('rgb(250, 250, 127)')
//                 rect(x* side, y * side, side, side)
               
//             }
//             else if (matrix[y][x] == 3) {
//                 fill('rgb(187, 94, 94)')
//                 rect(x * side, y * side, side, side)
//             }
//             else if (matrix[y][x] == 4) {
//                 fill('rgb(247, 182, 63)')
//                 rect(x * side, y * side, side, side)
//             }
//             else if (matrix[y][x] == 5) {
//                 fill('rgba(68, 68, 68, 0.986)');
//               ellipse(x * side, y * side, side * 2  ,side * 3 )
//             }
          
//             else {
//                 fill('grey') 
//                 rect(x * side, y * side, side , side)
//             }
         
//         }
//     }
//     for (let index = 0; index < grassArr.length; index++) {
//         grassArr[index].mul();
//     }
//     for (let index = 0; index < grassEaterArr.length; index++) {
//         grassEaterArr[index].eat();
//     }
//     for (let index = 0; index < predatorArr.length; index++) {
//         predatorArr[index].eat();
//     }
//     for (let index = 0; index <  killerArr.length; index++) {
//        killerArr[index].kill();
//     }
//     for (let index = 0; index <  blackArr.length; index++) {
//         blackArr[index].eat();
//      }
// }
// matrixGenerator(20, 1, 1);


// function weather() {
//     if (weath == "winter") {
//         weath = "spring"
//     }
//     else if (weath == "spring") {
//         weath = "summer"
//     }
//     else if (weath == "summer") {
//         weath = "autumn"
//     }
//     else if (weath == "autumn") {
//         weath = "winter"
//     }
//     io.sockets.emit('weather', weath)
// }
// setInterval(weather, 5000);


// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// app.use(express.static("."));
// app.get('/', function (req, res) {
//     res.redirect('index.html');
// });
// server.listen(3000);




// function creatingObjects() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 2) {
//                 var grassEater = new GrassEater(x, y);
//                 grassEaterArr.push(grassEater);
//             } else if (matrix[y][x] == 1) {
//                 var grass = new Grass(x, y);
//                 grassArr.push(grass);
//             }
//         }
//     }
// }
// creatingObjects();

// function game() {
//     if (grassArr[0] !== undefined) {
//         if(weath != 'autumn') {
//             for (var i in grassArr) {
//                 grassArr[i].mul();
//             }
//         }
        
//     }
//     if (grassEaterArr[0] !== undefined) {
//         for (var i in grassEaterArr) {
//             grassEaterArr[i].eat();
//         }
//     }

    
//     let sendData = {
//         matrix: matrix,
//         grassCounter: grassArr.length
//     }

    
//     io.sockets.emit("data", sendData);
// }



// setInterval(game, 1000)


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.killer = killerArr.length;
    statistics.black = blackArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
    
    