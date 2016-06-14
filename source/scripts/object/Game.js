import Stage from "./Stage.js"

export default class Game {
    constructor(game) {
        this.stage = new Stage(this, {
            colors: game.colors,
            stagenum: 1,
            dogs: 3
        })

        this.frame = {
            width: 640,
            height: 360,
            color: game.colors[0]
        }

        this.score = 0
        this.lives = 3
    }
    update(delta) {
        this.stage.update(delta)
    }
}
