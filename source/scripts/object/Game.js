import Stage from "./Stage.js"

const colors = [
    "#5A3F80",
    "#92869E",
    "#57395B",
    "#222222",
]

export default class Game {
    constructor() {
        this.stage = new Stage(this, {
            colors: colors,
            dogs: 3
        })

        this.frame = {
            width: 640,
            height: 360,
            color: colors[0]
        }

        this.score = 0
        this.lives = 3
    }
    update(delta) {
        this.stage.update(delta)
    }
}
