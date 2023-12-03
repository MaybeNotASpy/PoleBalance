const PIXI = window.PIXI;

var WIDTH = 400;
var HEIGHT = 400;

function resetObjects(objects) {
    objects.cart.x = WIDTH / 2 + 25;
    objects.cart.y = HEIGHT - 50;
    objects.cart.vx = 0;
    objects.cart.vy = 0;
    objects.pole.x = -22.5;
    objects.pole.y = -25;
    objects.pole.vx = 0;
    objects.pole.vy = 0;
    objects.pole.x = -22.5;
    objects.pole.y = -25;
    objects.pole.rotation = 0;
}

function initObjects(app) {
    const objects = {
        cart: new PIXI.Graphics(),
        pole: new PIXI.Graphics(),
        ground: new PIXI.Graphics(),
        left_wall: new PIXI.Graphics(),
        right_wall: new PIXI.Graphics(),
    }

    objects.cart.beginFill(0xFF0000);
    objects.cart.drawRect(-50, -50, 50, 50);
    objects.cart.endFill();
    app.stage.addChild(objects.cart);

    objects.pole.beginFill(0x0000FF);
    objects.pole.drawRect(-5, -100, 5, 100);
    objects.pole.endFill();
    objects.cart.addChild(objects.pole);

    objects.ground.beginFill(0x00FF00);
    objects.ground.drawRect(0, 0, WIDTH, 50);
    objects.ground.endFill();
    objects.ground.x = 0;
    objects.ground.y = HEIGHT - 50;
    app.stage.addChild(objects.ground);

    objects.left_wall.beginFill(0x00FF00);
    objects.left_wall.drawRect(0, HEIGHT-70, 50, HEIGHT);
    objects.left_wall.endFill();
    objects.left_wall.x = 0;
    objects.left_wall.y = 0;
    app.stage.addChild(objects.left_wall);

    objects.right_wall.beginFill(0x00FF00);
    objects.right_wall.drawRect(0, HEIGHT-70, 50, HEIGHT);
    objects.right_wall.endFill();
    objects.right_wall.x = WIDTH - 50;
    objects.right_wall.y = 0;
    app.stage.addChild(objects.right_wall);
    
    resetObjects(objects);

    return objects;
}
    

function initPixi() {
    var WIDTH = 400;
    var HEIGHT = 400;
    PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;
    const app = new PIXI.Application({
        width: WIDTH,
        height: HEIGHT,
        antialias: true,
        transparent: false,
        resolution: 1,
        view: document.getElementById("pixiCanvas"),
    });

    return app;
}

export { initPixi, initObjects, resetObjects };