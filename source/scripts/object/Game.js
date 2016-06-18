import Stage from "./Stage.js"

const INITIAL_LIVES = 3

export default class Game {
    constructor(state, game) {
        this.stagedata = game.stagedata

        this.state = state

        this.stage = new Stage(this, {
            stagenum: 0,
            colors: this.stagedata[0].colors,
            dogs: this.stagedata[0].rescues,
            iteration: 3,
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
                dogs: this.stagedata[stagenum].rescues,
                colors: this.stagedata[stagenum].colors,
                iteration: 3,
            }
        }

        this.stage = new Stage(this, stagedata)
    }
}
