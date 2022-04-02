
function setup() {
    var weath = 'summer'
    var socket = io();

    var side = 30;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorElement = document.getElementById('predatorCount');
    let killerCountElement = document.getElementById('killerEaterCount');
    let blackCountElement = document.getElementById('blackCount');
    

    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        weath = data;
    })
    function drawCreatures(data) {
       
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        killerCountElement.innerText = data.killerCounter;
        blackCountElement.innerText = data.blackCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        
        background('#acacac');
      
        
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                        if(weath == "spring")
                        {
                            fill("#84DCC6")
                        }
                        else if(weath == "summer")
                        {
                            fill("#5B8C5A");
                        }
                        else if(weath == "winter")
                        {
                            fill("white")
                        }
                        else if(weath == "autumn")
                        {
                            fill("#4dffa6")
                        }
                        rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
socket.on('send matrix', nkarel)



function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addKiller() {
    socket.emit("add killer")
}
function addBlack() {
    socket.emit("add black")
}



function winterFunc() {
    weath = "winter"
}
function summerFunc() {
    weath = "summer"
}
function springFunc() {
    weath = "spring"
}
function autumnFunc() {
    weath = "autumn"
}

function lightning() {
    socket.emit("createLightning")
}


    