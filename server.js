let Grass = require("./modules/Grass.js");
let GrassEater = require("./modules/GrassEater.js");
let Predator = require('./modules/Predator.js');
let Killer = require('./modules/KIller.js');
let Black = require('./modules/Black.js');

weath = "winter";
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

  matrixGenerator(20,1,1);
    }



// Return to this weather stuff


function draw() {

    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {

            if (matrix[y][x] == 1) {
                fill('rgb(96, 139, 96)')
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 2) {
                fill('rgb(250, 250, 127)')
                rect(x* side, y * side, side, side)
               
            }
            else if (matrix[y][x] == 3) {
                fill('rgb(187, 94, 94)')
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 4) {
                fill('rgb(247, 182, 63)')
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 5) {
                fill('rgba(68, 68, 68, 0.986)');
              ellipse(x * side, y * side, side * 2  ,side * 3 )
            }
          
            else {
                fill('grey') 
                rect(x * side, y * side, side , side)
            }
         
        }
    }
    for (let index = 0; index < grassArr.length; index++) {
        grassArr[index].mul();
    }
    for (let index = 0; index < grassEaterArr.length; index++) {
        grassEaterArr[index].eat();
    }
    for (let index = 0; index < predatorArr.length; index++) {
        predatorArr[index].eat();
    }
    for (let index = 0; index <  killerArr.length; index++) {
       killerArr[index].kill();
    }
    for (let index = 0; index <  blackArr.length; index++) {
        blackArr[index].eat();
     }
}




function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);
//weather Stuff return to this//

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
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
                let killer = new Killer(x, y);
                killerArr.push(killer);
            }
            else if (matrix[y][x] == 5) {
                let black = new Black(x, y);
                blackArr.push(black);
            }
           
        }
    }
    io.sockets.emit("data", sendData)
creatingObjects();

// weather shit//
function game() {
    if (grassArr[0] !== undefined) {
        if(weath != 'winter') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in killerArr) {
        killerArr[i].eat()
    }
    for (var i in blackArr) {
        blackArr[i].eat()
    }
    
    io.sockets.emit("data", sendData)
}


setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    killerArr = []
    blackArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("data", sendData)
}
function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
  io.sockets.emit("data", sendData)
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("data", sendData)
}
function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y, 3))
        }
    }
    io.sockets.emit("data", sendData)
}

function addKiller() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            killerArr.push(new Killer(x, y, 4))
        }
    }
    io.sockets.emit("data", sendData)
}

function addBlack() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            blackArr.push(new Black(x, y, 5))
        }
    }
    io.sockets.emit("data", sendData)
}
function lightning() {

    let y = Math.floor(Math.random() * matrix.length - 1)
    let x = Math.floor(Math.random() * matrix[0].length - 1)



    if (y > 0 && x > 0) {

        for (let i in matrix) {

            if (y > matrix.length - 1 || x > matrix[0].length - 1) {
                break
            }
            matrix[y][x] = 7
            eatFunc(x,y)
           
            y += 1
            x += 1

        }
    }
    io.sockets.emit("data", sendData)
    setTimeout(function () {
        for (let y in matrix) {
            for (let x in matrix[y]) {
                if (matrix[y][x] == 7) {
                    matrix[y][x] = 0


                }
            }
        }
        io.sockets.emit("data", sendData)
    }, 2000)
}


let sendData = {
    matrix: matrix,
    grassCounter: grassArr.length
}


io.sockets.emit("data", sendData);




setInterval(game, 1000)

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add killer", addKiller)
    socket.on("add black", addBlack)
    socket.on("createLightning", lightning)
});


// var statistics = {};

// setInterval(function () {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEaterArr.length;
//     statistics.predatorArr = predatorArr.length;
//     statistics.birdArr = birdArr.length;
//     statistics.snakeArr = snakeArr.length;
//     statistics.lionArr = lionArr.length;
//     fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
//         console.log("send")
//     })
// }, 1000)

   
// weather Shit///

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
    
}    