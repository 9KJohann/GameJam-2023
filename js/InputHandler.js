class AbstractInputHandler {

    constructor() {
        if (this.constructor === AbstractInputHandler) {
            throw new Error("Can't instantiate abstract class!");
        }

        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;

        this.bluePressed = false;
        this.orangePressed = false;
        this.redPressed = false;
        this.greenPressed = false;
    }

    updateInput() { }
}

export class InputHandler extends AbstractInputHandler {

    constructor() {
        super();
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;

        this.bluePressed = false;
        this.orangePressed = false;
        this.redPressed = false;
        this.greenPressed = false;

        this.keyboardEnabled = true;
        this.controllerEnabled = true;

        this.keyboardInput = new InputHandlerKeyboard();
        this.controllerInput = new InputHandlerController();
    }

    // Constants
    static get EVENT_SWAP() { return "swap"; }

    updateInput() {
        if (this.keyboardInput !== null) {
            this.keyboardInput.updateInput();
        }
        if (this.controllerInput !== null) {
            this.controllerInput.updateInput();
        }

        this.upPressed = this.controllerInput.upPressed || this.keyboardInput.upPressed;
        this.downPressed = this.controllerInput.downPressed || this.keyboardInput.downPressed;
        this.leftPressed = this.controllerInput.leftPressed || this.keyboardInput.leftPressed;
        this.rightPressed = this.controllerInput.rightPressed || this.keyboardInput.rightPressed;

        // console.log("Up   : " + this.upPressed);
        // console.log("Down : " + this.downPressed);
        // console.log("Left : " + this.leftPressed);
        // console.log("Right: " + this.rightPressed);
    }
}

class InputHandlerController extends AbstractInputHandler {

    constructor() {
        super();
        this.controllerIndex = null;

        window.addEventListener('gamepadconnected', (event) => {
            this.controllerIndex = event.gamepad.index;
            console.log("GamePad connected");
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            this.controllerIndex = null;
            console.log("GamePad disconnected");
        });
    }

    updateInput() {
        if (this.controllerIndex !== null) {
            const gamepad = navigator.getGamepads()[this.controllerIndex];

            const buttons = gamepad.buttons;

            this.upPressed = buttons[12].pressed;
            this.downPressed = buttons[13].pressed;
            this.leftPressed = buttons[14].pressed;
            this.rightPressed = buttons[15].pressed;

            const stickDeadZone = 0.4;
            const leftRightValue = gamepad.axes[0];

            if (leftRightValue >= stickDeadZone) {
                this.rightPressed = true;
            } else if (leftRightValue <= -stickDeadZone) {
                this.leftPressed = true;
            }

            const upDownValue = gamepad.axes[1];

            if (upDownValue >= stickDeadZone) {
                this.downPressed = true;
            } else if (upDownValue <= -stickDeadZone) {
                this.upPressed = true;
            }

            this.redPressed = buttons[0].pressed;
            this.bluePressed = buttons[1].pressed;
            this.orangePressed = buttons[2].pressed;
            this.greenPressed = buttons[3].pressed;

        }
    }
}

class InputHandlerKeyboard extends AbstractInputHandler {

    constructor() {
        super();
        this.keys = [];

        this.KEY_UP = "KeyW";
        this.KEY_DOWN = "KeyS";
        this.KEY_LEFT = "KeyA";
        this.KEY_RIGHT = "KeyD";
        this.KEY_SWAP = "Space";

        window.addEventListener("keydown", (event) => {
            // REMOVED: This code has bugs
            // if (this.keys.indexOf(event.code) == -1) {
            //     this.keys.push(event.code);
            // }
            if (event.code == this.KEY_UP) { this.upPressed = true; }
            if (event.code == this.KEY_DOWN) { this.downPressed = true; }
            if (event.code == this.KEY_LEFT) { this.leftPressed = true; }
            if (event.code == this.KEY_RIGHT) { this.rightPressed = true; }

            // Swap shall only occur once for each keydown event
            if (event.code == this.KEY_SWAP) { window.dispatchEvent(new Event(InputHandler.EVENT_SWAP)) }

            console.log(event)
            console.log(this.keys)
        });

        window.addEventListener("keyup", (event) => {
            // REMOVED: This code has bugs
            // if (this.keys.indexOf(event.code) >= 0) {
            //     this.keys.splice(event.code, 1);
            // }
            if (event.code == this.KEY_UP) { this.upPressed = false; }
            if (event.code == this.KEY_DOWN) { this.downPressed = false; }
            if (event.code == this.KEY_LEFT) { this.leftPressed = false; }
            if (event.code == this.KEY_RIGHT) { this.rightPressed = false; }

            console.log(event)
            console.log(this.keys)
        });
    }

    updateInput() {
        // REMOVED: This code has bugs
        // this.upPressed = (this.keys.indexOf(this.KEY_UP) >= 0);
        // this.downPressed = (this.keys.indexOf(this.KEY_DOWN) >= 0);
        // this.leftPressed = (this.keys.indexOf(this.KEY_LEFT) >= 0);
        // this.rightPressed = (this.keys.indexOf(this.KEY_RIGHT) >= 0);
    }

}