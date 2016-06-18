import Game from "./Game.js"
import Frame from "./Frame.js"

export default class State {
    constructor() {
        this.game = new Game(this)
        this.frame = new Frame({
            width: 640, height: 360,
            color: "#222"
        })

        if(STAGE == "DEVELOPMENT") {
            window.state = this
        }
    }
    update(delta) {
        this.game.update(delta)
        return this
    }
}
