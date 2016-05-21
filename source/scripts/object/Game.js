import Level from "./Level.js"
import Player from "./Player.js"

const UNIT = 32
const colors = [
    "#5A3F80",
    "#92869E",
    "#57395B",
    "#222222",
]

export default class Game {
    constructor() {
        this.add("player", new Player({
            position: {x: UNIT * 4, y: UNIT * 2},
            width: UNIT * 0.5, height: UNIT * 0.5,
            color: "#FFF"
        }))
        this.add("levels", [
            new Level(0, colors[1], [
                0, +1, 0, 0, 0, -1, -1, 0,
                0, "+", 0, 0, 0, 0, -1, 0,
                -1, 0, 0, +1, 0,
            ]),
            new Level(1, colors[2], [
                0, -1, 0, 0, +1, 0, +1,
                0, 0, 0, 0, -1, 0, 0, 0,
                +1, 0, 0, "-",
            ]),
            new Level(2, colors[3], [
                0, 0, "+", 0, 0, 0, -1, 0,
                0, 0, -1, 0, 0, +1, 0,
                +1, 0, 0, -1, -1, 0, 0
            ]),
        ])

        this.frame = {
            width: 640,
            height: 360,
            color: colors[0]
        }
    }
    add(label, object) {
        this[label] = object
        if(object instanceof Array) {
            for(var index in object) {
                object[index].game = this
            }
        } else {
            object.game = this
        }
    }
}
