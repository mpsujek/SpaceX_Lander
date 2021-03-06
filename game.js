var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var gravity = 0.05;
var spaceship = {
    color: "#9e9e9e",
    width: 6,
    height: 28,
    position: {
        x: Math.random() * (780 - 5) + 5,
        y: 10
    },
    angle: 0,
    velocity: {
        x: 0,
        y: 0
    },
    thrust: 0.1,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    fuel: 1000
};
var landingPoint = {
    color: "black",
    width: 50,
    height: 10,
    position: {
        x: Math.random() * (780 - 5) + 5,
        y: 480
    }
};

var clouds = {
    color: 'white',
    width: 100,
    height: 100,
    position: {
        x: Math.random() * (780 - 5) + 5,
        y: 0
    }
};

var ocean = {
    color: "#0D47A1",
    width: 800,
    height: 20,
    position: {
        x: 400,
        y: 495
    }
};

var startMonit = {
    color: "#90A4AE",
    width: 500,
    height: 300,
    position: {
        x: 400,
        y: 250
    }
};

var fuelLevel = {
    width: 100,
    height: 100,
    color: "transparent",
    position: {
        x: 0,
        y: 0
    }
};

var speed = 0.5;
var cloudsSpeed = 0.1;
var distance;


function drawSpaceship() {
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = spaceship.color;
    context.moveTo(0, 0);
    context.lineTo(0, 14);
    context.lineTo(7, 14);
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 14);
    context.lineTo(-7, 14);
    context.fill();
    context.closePath();

    if (spaceship.engineOn && spaceship.fuel > 0) {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 15);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "#FF5722";
        context.fill();
    }
    context.restore();
}

function updateSpaceship() {
    spaceship.position.x -= spaceship.velocity.x;
    spaceship.position.y -= spaceship.velocity.y;
    if (spaceship.rotatingRight) {
        spaceship.angle += Math.PI / 180;
    } else if (spaceship.rotatingLeft) {
        spaceship.angle -= Math.PI / 180;
    }

    if (spaceship.engineOn) {
        spaceship.velocity.x += spaceship.thrust * Math.sin(-spaceship.angle);
        spaceship.velocity.y += spaceship.thrust * Math.cos(spaceship.angle);
    }
    spaceship.velocity.y -= gravity;


}

function drawLandingPoint() {
    context.save();
    context.beginPath();
    context.translate(landingPoint.position.x, landingPoint.position.y);
    context.rect(landingPoint.width * -0.5, landingPoint.height * -0.5, landingPoint.width, landingPoint.height);
    context.fillStyle = landingPoint.color;
    context.fill();
    context.closePath();
    context.restore();

}

function drawOcean() {
    context.save();
    context.beginPath();
    context.translate(ocean.position.x, ocean.position.y);
    context.rect(ocean.width * -0.5, ocean.height * -0.5, ocean.width, ocean.height);
    context.fillStyle = ocean.color;
    context.fill();
    context.closePath();
    context.restore();
}

function drawCloudsOne() {
    context.save();
    context.beginPath();
    context.translate(-clouds.position.x, -clouds.position.y);
    context.rect(0, 50, 150, 30);
    context.rect(50, 30, 90, 20);
    context.rect(100, 10, 30, 30);
    context.rect(400, 50, 150, 30);
    context.rect(450, 30, 90, 20);
    context.rect(500, 10, 30, 30);
    context.rect(800, 50, 150, 30);
    context.rect(850, 30, 90, 20);
    context.rect(900, 10, 30, 30);
    context.fillStyle = clouds.color;
    context.fill();
    context.closePath();
    context.restore();
}

function drawCloudsTwo() {
    context.save();
    context.beginPath();
    context.translate(clouds.position.x, clouds.position.y);
    context.rect(-200, 150, 150, 30);
    context.rect(-150, 130, 90, 20);
    context.rect(-100, 110, 30, 30);
    context.rect(200, 150, 150, 30);
    context.rect(250, 130, 90, 20);
    context.rect(300, 110, 30, 30);
    context.rect(600, 150, 150, 30);
    context.rect(650, 130, 90, 20);
    context.rect(700, 110, 30, 30);
    context.rect(1000, 150, 150, 30);
    context.rect(1050, 130, 90, 20);
    context.rect(1100, 110, 30, 30);
    context.fillStyle = clouds.color;
    context.fill();
    context.closePath();
    context.restore();
}

function drawMonit(text, restText, lastText) {
    context.save();
    context.beginPath();
    context.translate(startMonit.position.x, startMonit.position.y);
    context.rect(startMonit.width * -0.5, startMonit.height * -0.5, startMonit.width, startMonit.height);
    context.fillStyle = startMonit.color;
    context.fill();
    context.restore();
    context.closePath();
    context.font = "30px 'Press Start 2P'";
    context.fillStyle = "black";
    context.fillText(text, 280, 150);
    context.closePath();
    context.beginPath();
    context.font = "15px 'Press Start 2P'";
    context.fillText(restText, 200, 250);
    context.closePath();
    context.beginPath();
    context.font = "15px 'Press Start 2P'";
    context.fillText(lastText, 170, 350);
    context.closePath();
    context.restore();
}

function drawFuelLevel() {
    context.save();
    context.beginPath();
    context.translate(fuelLevel.position.x, fuelLevel.position.y);
    context.rect(fuelLevel.width * -0.5, fuelLevel.height * -0.5, fuelLevel.width, fuelLevel.height);
    context.fillStyle = fuelLevel.color;
    context.fill();
    context.closePath();
    context.beginPath();
    context.font = "16px 'Press Start 2P'";
    context.fillStyle = "black";
    context.fillText("SpaceX Game", 10, 25);
    context.fillText("Fuel level:" + spaceship.fuel, 10, 50);
    context.fillText("Steer with arrows", 10, 75);
    context.fillText("Land on platform", 10, 100);
    context.closePath();
    context.restore();
}

function drawArrow(x, y) {
    context.save();
    context.beginPath();
    context.rect(x, y, 10, 10);
    context.fillStyle = 'black';
    context.fillText(distance, x, y + 20);
    context.fill();
    context.closePath();
    context.restore();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateSpaceship();

    drawCloudsOne();

    drawCloudsTwo();

    drawFuelLevel();

    drawSpaceship();

    drawLandingPoint();

    drawOcean();

    collisionDetector();

    requestAnimationFrame(draw);

    landingPoint.position.x += speed;
    if (landingPoint.position.x > 780) {
        speed = -0.5;
    } else if (landingPoint.position.x < 20) {
        speed = 0.5;
    }

    clouds.position.x += cloudsSpeed;
    if (clouds.position.x + 500 > 780) {
        cloudsSpeed = -0.10;
    } else if (clouds.position.x < 20) {
        cloudsSpeed = 0.10;
    }

    if (spaceship.engineOn === true && spaceship.fuel > 0) {
        spaceship.fuel -= 1;
    }


    if (spaceship.fuel === 0) {
        spaceship.thrust = 0;
        spaceship.fuel = 0;
        speed = 0;
    }

    if (collisionDetector() && spaceship.velocity.y > -1.5 && spaceship.angle < 0.20 && spaceship.angle > -0.20) {
        spaceship.velocity.x = 0;
        spaceship.velocity.y = 0;
        speed = 0;
        drawMonit('Great Job', 'Elon Musk is proud of You', 'Press Space button to Restart');

    }

    if (destroyDetector()) {
        spaceship.velocity.x = 0;
        spaceship.velocity.y = 0;
        speed = 0;
        spaceship.angle += Math.PI / 180;

        drawMonit('Game Over', '', 'Press Space button to Try Again');
        spaceship.color = 'red';
        spaceship.width = '30';
        spaceship.height = '30';

    }

    if (spaceship.position.y < 0) {
        drawArrow(spaceship.position.x, 1);
        distance = -Math.round(spaceship.position.y);
    }

    if (0 > spaceship.position.x) {
        drawArrow(1, spaceship.position.y);
        distance = -Math.round(spaceship.position.x);

    }
    if (spaceship.position.x > 800) {
        drawArrow(780, spaceship.position.y);
        distance = Math.round(spaceship.position.x) - 800;

    }
    if (0 > spaceship.position.x && spaceship.position.y < 0) {
        drawArrow(1, 1);
    }
    if (spaceship.position.x > 800 && spaceship.position.y < 0) {
        drawArrow(780, 1);
    }
}

function collisionDetector() {
    if (spaceship.position.x < landingPoint.position.x + landingPoint.width &&
        spaceship.position.x + spaceship.width > landingPoint.position.x - 20 &&
        (spaceship.position.y + (spaceship.height / 2)) < landingPoint.position.y + landingPoint.width &&
        (spaceship.position.y + (spaceship.height / 2)) + spaceship.width > landingPoint.position.y) {

        return true;
    }
}

function destroyDetector() {
    if (spaceship.position.y > 475) {
        return true;
    }
}

function keyLetGo(event) {
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
        case 32:
            // space bar
            location.reload();
            break;
    }
}

document.addEventListener('keydown', keyPressed);

draw();
