import { mainLoop } from "./loop.js";
import { initControls } from "./input.js";
import { initPixi, initObjects, resetObjects } from "./graphics.js";
import { gameState } from "./state.js";


function main() {
    var app = initPixi();
    var objects = initObjects(app);
    initControls(objects);

    app.ticker.add((delta) => {
        if (gameState.getState() != "play") {
            if (gameState.mustReset) {
                resetObjects(objects);
                gameState.mustReset = false;
            }
            return;
        }
        else if (gameState.getState() == "play") {
            if (gameState.mustStart) {
                resetObjects(objects);
                gameState.mustStart = false;
            }
            gameState.gameStart();
        }
        mainLoop(delta, objects);
    });
}

main();
