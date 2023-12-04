class GameState {
    constructor() {
        this.state = "start";
        this.mustReset = false;
        this.mustStart = false;
        this.playTime = 0;
    }

    getState() {
        return this.state;
    }

    addTime(deltaT) {
        this.playTime += deltaT;
    }

    gameReset() {
        this.state = "start";
        this.mustReset = true;
    }
    gameStart() {
        this.state = "play";
        this.mustStart = false;
        this.playTime = 0;
    }
}

var gameState = new GameState();

export { gameState };