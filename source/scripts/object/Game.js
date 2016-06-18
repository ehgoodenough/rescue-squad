import Stage from "./Stage.js"

import {PROTOSTAGES} from "../utility/Data.js"
import {INITIAL_CONTINUES} from "../utility/Data.js"

export default class Game {
    constructor(state) {
        this.state = state

        this.score = 0
        this.continues = INITIAL_CONTINUES

        this.stage = new Stage(this, this.getProtostage(0))
    }
    update(delta) {
        this.stage.update(delta)
    }
    restart() {
        this.state.game = new Game(this.state)
    }
    startStage(protostage) {
        if(protostage == undefined) {
            var stagenum = !!this.stage ? this.stage.stagenum + 1 : 0
            protostage = this.getProtostage(stagenum)
        }

        this.stage = new Stage(this, protostage)
    }
    getProtostage(stagenum) {
        if(PROTOSTAGES[stagenum]) {
            return PROTOSTAGES[stagenum]
        } else {
            return {
                rescues: 3,
                colors: [
                    "#EEE",
                    "#666",
                    "#444",
                    "#222",
                ],
                entities: []
            }
        }
    }
}
