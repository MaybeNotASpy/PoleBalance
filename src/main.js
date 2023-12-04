
import { gameState } from "./state.js";
const Matter = window.Matter;

function setupHTML() {
    var startButton = document.getElementById("start-button");
    var resetButton = document.getElementById("reset-button");

    startButton.addEventListener("click", () => {
        gameState.gameStart();
    });

    resetButton.addEventListener("click", () => {
        gameState.gameReset();
    });
}



var Engine = Matter.Engine,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;

var engine = Engine.create();

var render = Render.create({
    element: document.getElementById("matterCanvas"),
    engine: engine,
    options: {
        width: 400,
        height: 400,
        wireframes: false
    }
});

// Create a cart
var cart = Bodies.rectangle(200, 325, 50, 50, { inertia: Infinity,
    friction: 0.1, });
// Create a ball
var ball = Bodies.circle(200, 100, 10, { 
    isStatic: false,
    inertia: Infinity,
    mass: 1,
});
// Create a pole
var pole = Constraint.create({
    bodyA: cart,
    bodyB: ball,
    pointA: { x: 0, y: -25 },
    pointB: { x: 0, y: 0 },
    length: 200,
    stiffness: 1,
    damping: 0
});
// Create the ground
var ground = Bodies.rectangle(0, 750, 800, 800, { isStatic: true });
// Create the left wall
var left_wall = Bodies.rectangle(0, 400, 100, 150, { isStatic: true });
// Create the right wall
var right_wall = Bodies.rectangle(400, 400, 100, 150, { isStatic: true });

const keyHandlers = {
    KeyD: () => {
      Matter.Body.applyForce(cart, {
        x: cart.position.x,
        y: cart.position.y
      }, {x: 0.02, y: 0})
    },
    KeyA: () => {
      Matter.Body.applyForce(cart, {
        x: cart.position.x,
        y: cart.position.y
      }, {x: -0.02, y: 0})
    },
  };
  
  const keysDown = new Set();
  document.addEventListener("keydown", event => {
    keysDown.add(event.code);
  });
  document.addEventListener("keyup", event => {
    keysDown.delete(event.code);
  });
  
  Matter.Events.on(engine, "beforeUpdate", event => {
    [...keysDown].forEach(k => {
      keyHandlers[k]?.();
    });
  });

Composite.add(engine.world, [cart, pole, ball, ground, left_wall, right_wall]);

function updateHTML(objects) {
    var thetaText = document.getElementById("theta-text");
    var thetaDotText = document.getElementById("theta-dot-text");
    var timeText = document.getElementById("time-text");

    let cartX = pole.bodyA.position.x;
    let cartY = pole.bodyA.position.y;
    let ballX = pole.bodyB.position.x;
    let ballY = pole.bodyB.position.y;
    let theta = Math.atan2(ballY - cartY, ballX - cartX);
    theta = theta + 1/2 * Math.PI;
    thetaText.value = "Theta: " + theta;
    let xDot = pole.bodyB.velocity.x;
    let yDot = pole.bodyB.velocity.y;
    let thetaDot = Math.atan2(yDot, xDot);
    thetaDotText.value = "Theta Dot: " + thetaDot;
    timeText.value = "Time: " + (gameState.playTime / 1000).toFixed(2) + " s";
}

Render.run(render);

function resetObjects() {
    Matter.Body.setPosition(cart, {x: 200, y: 325});
    Matter.Body.setVelocity(cart, {x: 0, y: 0});
    Matter.Body.setPosition(ball, {x: 200, y: 100});
    Matter.Body.setVelocity(ball, {x: 0, y: 0});
    Matter.Body.setAngle(ball, 0);
    Matter.Body.setAngularVelocity(ball, 0);
        // Add noise to the initial conditions
    Matter.Body.applyForce(ball, {
        x: ball.position.x,
        y: ball.position.y
    }, {x: 0.001, y: 0});
    gameState.mustReset = false;
}

function checkBounds() {
    let cartX = pole.bodyA.position.x;
    let cartY = pole.bodyA.position.y;
    let ballX = pole.bodyB.position.x;
    let ballY = pole.bodyB.position.y;
    let theta = Math.atan2(ballY - cartY, ballX - cartX);
    theta = theta + 1/2 * Math.PI;
    if (theta > Math.PI / 4) {
        gameState.gameReset();
    } else if (theta < -Math.PI / 4) {
        gameState.gameReset();
    }

}


function mainLoop() {
    if (gameState.getState() === "play") {
        Engine.update(engine, 1000 / 60, 1);
        gameState.addTime(1000 / 60);
        checkBounds();
    }
    else if (gameState.mustReset) {
        resetObjects();
        //presentScoreToNEAT();
    }
    updateHTML();
    requestAnimationFrame(mainLoop);
}

setupHTML();
mainLoop();