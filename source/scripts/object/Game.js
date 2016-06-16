import Stage from "./Stage.js"

const INITIAL_LIVES = 3

export default class Game {
    constructor(state, game) {
        this.stagedata = game.stagedata
        this.colors = game.colors

        this.state = state

        this.stage = new Stage(this, {
            colors: game.colors,
            stagenum: 0,
            dogs: this.stagedata[0]
        })

        this.score = 0
        this.lives = INITIAL_LIVES
    }
    update(delta) {
        this.stage.update(delta)
    }
    startStage(stagedata) {
        if(stagedata == undefined) {
            var stagenum = !!this.stage ? this.stage.stagenum + 1 : 0
            stagedata = {
                stagenum: stagenum,
                dogs: this.stagedata[stagenum],
                colors: this.colors,
            }
        }

        this.stage = new Stage(this, stagedata)
    }
}
