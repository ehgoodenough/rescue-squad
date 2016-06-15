import Stage from "./Stage.js"

export default class Game {
    constructor(game) {
        this.stagedata = game.stagedata
        this.colors = game.colors

        this.stage = new Stage(this, {
            colors: game.colors,
            stagenum: 0,
            dogs: this.stagedata[0]
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
