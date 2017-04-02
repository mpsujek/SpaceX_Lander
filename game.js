var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var gravity = 0.05;
var spaceship = {
    color: "grey",
    width: 6,
    height: 28,
    position: {
        x: Math.random() * (780 - 5) + 5,
        y: 10
    },
    angle:0,
    velocity: {
        x: 0,
        y: 0
    },
    thrust:0.1,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
};
var landingPoint = {
  color:"black",
  width:50,
  height:10,
  position:{
    x: Math.random() * (780 - 5) + 5,
    y: 480
  }
};

var ocean = {
  color:"#0D47A1",
  width: 800,
  height: 20,
  position:{
    x: 400,
    y: 495
  }
};

var startMonit = {
  color:"#666 ",
  width: 500,
  height: 500,
  position:{
    x: 400,
    y: 250
  }
};

function drawSpaceship() {
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();

    if (spaceship.engineOn) {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 15);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "red";
        context.fill();
    }
    context.restore();
}

function updateSpaceship(){
     spaceship.position.x -= spaceship.velocity.x;
     spaceship.position.y -= spaceship.velocity.y;
    if(spaceship.rotatingRight)
    {
        spaceship.angle += Math.PI / 180;
    }
    else if(spaceship.rotatingLeft)
    {
        spaceship.angle -= Math.PI / 180;
    }

    if(spaceship.engineOn)
    {
        //console.log(spaceship.velocity.x, spaceship.thrust);
        spaceship.velocity.x += spaceship.thrust * Math.sin(-spaceship.angle);
        //console.log('velocity.x',spaceship.velocity.x, spaceship.thrust);
        spaceship.velocity.y += spaceship.thrust * Math.cos(spaceship.angle);
        // console.log(spaceship.velocity.y);
        // * Math.cos(spaceship.angle);
    }
     spaceship.velocity.y -= gravity;


}

function drawLandingPoint(){
  context.save();
  context.beginPath();
  context.translate(landingPoint.position.x, landingPoint.position.y);
  context.rect(landingPoint.width * -0.5, landingPoint.height * -0.5, landingPoint.width, landingPoint.height);
  context.fillStyle = landingPoint.color;
  context.fill();
  context.closePath();
  context.restore();

}

function drawOcean(){
  context.save();
  context.beginPath();
  context.translate(ocean.position.x, ocean.position.y);
  context.rect(ocean.width * - 0.5, ocean.height * - 0.5, ocean.width, ocean.height);
  context.fillStyle = ocean.color;
  context.fill();
  context.closePath();
  context.restore();
}

function dawStartMonit(){
  context.save();
  context.beginPath();
  context.translate(startMonit.position.x, startMonit.position.y);
  context.rect(startMonit.width * - 0.5, startMonit.height * - 0.5, startMonit.width, startMonit.height);
  context.fillStyle = startMonit.color;
  context.fill();
  context.closePath();
  context.restore();
}

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSpaceship();

    drawSpaceship();

    drawLandingPoint();

    drawOcean();

    colisionDetector();

    requestAnimationFrame(draw);

    destroyDetector();


    if (colisionDetector() && spaceship.velocity.y > -1.5){
      spaceship.velocity.x = 0;
      spaceship.velocity.y = 0;
      }

    dawStartMonit();

}


function colisionDetector() {
  if(spaceship.position.x < landingPoint.position.x + landingPoint.width &&
    spaceship.position.x + spaceship.width >landingPoint.position.x &&
    (spaceship.position.y + (spaceship.height/2))< landingPoint.position.y + landingPoint.width &&
    (spaceship.position.y + (spaceship.height/2)) + spaceship.width>landingPoint.position.y ){

    return true;
  }
}
function destroyDetector(){
  if(spaceship.position.x < (ocean.position.x + ocean.width) &&
    spaceship.position.x + spaceship.width >ocean.position.x &&
    (spaceship.position.y + (spaceship.height))< ocean.position.y + ocean.width &&
    (spaceship.position.y + (spaceship.height)) + spaceship.width>ocean.position.y ){
      console.log("destoyed");
    }
}


function keyLetGo(event) {
    // console.log('keyLetGo', spaceship.position);
    switch (event.keyCode) {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

function keyPressed(event) {
    // console.log('keyPressed',spaceship.position);
    switch (event.keyCode) {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = true;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = true;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = true;
            break;
    }
}

document.addEventListener('keydown', keyPressed);

draw();
