

var matrix = [];
let side = 20;
let socket = io();

function setup() {
    var weath = "winter";

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let beastCountElement = document.getElementById('beastCount');
    let dragonCountElement = document.getElementById('dragonCount');
    
    

    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        
        weath = data;
    });
    function drawCreatures(data) {
       console.log(data);
       
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        beastCountElement.innerText = data.beastCounter;
        dragonCountElement.innerText = data.dragonCounter;


        createCanvas(matrix[0].length * side, matrix.length * side);
       
      
      
        
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
              if (matrix[i][j] == 1) {
                if (weath == "spring") {
                    fill("lightgreen");
                  } else if (weath == "summer") {
                    fill("green");
                  } else if (weath == "winter") {
                    fill("#d6ceb8");
                  } else if (weath == "autumn") {
                    fill("orange");
                  }
                rect(j * side, i * side, side, side);
              } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
              } else if (matrix[i][j] == 0) {
                fill("#acacac");
                rect(j * side, i * side, side, side);
              } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
              } else if (matrix[i][j] == 4) {
                fill("teal");
                rect(j * side, i * side, side, side);
              } else if (matrix[i][j] == 5) {
                fill("black");
                rect( j * side , j * side , side , side );
              }
              
                else if (matrix[i][j] == 7) {
                 fill("#00EEFF")
                 rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j]== 8) {
                    fill("black")
                    rect(j * side, i * side, side, side);
                }
      
              }
            }
          }
        
      }
      


function kill() {
    socket.emit("kill")
}
function Lightning() {
    socket.emit("createLightning")
}
function bomb(){
    socket.emit("createBomb")
}

// function addGrass() {
//     socket.emit("add grass")
// }
// function addGrassEater() {
//     socket.emit("add grassEater")
// }
// function addPredator() {
//     socket.emit("add predator")
// }


    