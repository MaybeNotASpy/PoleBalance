function keyboard(value) {
    const key = {
      value: value,
      isDown: false,
      isUp: true,
      press: undefined,
      release: undefined,
      unsubscribe: undefined,
      downHandler: undefined,
      upHandler: undefined
    };
    //The `downHandler`
    key.downHandler = (event) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }

/**
 * Initializes the controls for the objects.
 * @param {object} objects - The objects to control.
 */
function initControls(objects) {
  //Capture the keyboard arrow keys
  const left = keyboard("ArrowLeft"),
  right = keyboard("ArrowRight");

  left.press = () => {
    objects.cart.vx = -5;
    objects.cart.vy = 0;
  };

  left.release = () => {
    if (!right.isDown && objects.cart.vy === 0) {
        objects.cart.vx = 0;
    }
  }

  right.press = () => {
    objects.cart.vx = 5;
    objects.cart.vy = 0;
  };

  right.release = () => {
    if (!left.isDown && objects.cart.vy === 0) {
        objects.cart.vx = 0;
    }
  }
}

export { initControls };