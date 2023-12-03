import { gameState } from "./state.js";

function checkBounds(objects) {
    if (objects.cart.x < 100) {
        objects.cart.x = 100;
        objects.cart.vx = 0;
    }
    if (objects.cart.x > 350) {
        objects.cart.x = 350;
        objects.cart.vx = 0;
    }
}

function updateCart(deltaT, objects) {
    objects.cart.x += objects.cart.vx * deltaT;
    objects.cart.y += objects.cart.vy * deltaT;
}

function applyPhysics(objects, deltaT) {
    //
}

function updatePole(objects, deltaT) {
    ///
}

function checkPoleCollision(objects) {
    if (Math.abs(objects.pole.rotation > Math.PI / 2)) {
        gameState.gameReset();
    }
}

function mainLoop(deltaT, objects) {
    updateCart(deltaT, objects);
    checkBounds(objects);
    applyPhysics(objects, deltaT);
    updatePole(objects, deltaT);
    checkPoleCollision(objects);
}

export { mainLoop };