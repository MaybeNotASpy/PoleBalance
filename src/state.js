class GameState {
    constructor() {
        this.state = "start";
        this.mustReset = false;
        this.mustStart = false;
    }

    getState() {
        return this.state;
    }

    gameReset() {
        this.state = "start";
        this.mustReset = true;
    }
    gameStart() {
        this.state = "play";
        this.mustStart = false;
    }
}

var gameState = new GameState();

export { gameState };