import {UNIT} from "../utility/Constants.js"
const OFFSET = 8 // gap between each level
const BUFFER = 360 - (((2 + 2 + 2) * UNIT) + OFFSET + OFFSET)
const GUI_SIZE = 28

import {Beagle} from "./Entity.js"

export default class Level {
    constructor(level) {
        this.color = level.color
        this.levelnum = level.levelnum
        this.speed = ((this.levelnum * 2) + 3) / 10

        this.points = new Array()
        while(this.points.length < 21) {
            this.addAnotherPoint()
        }
    }
    addAnotherPoint() {
        if(this.points.length == 0) {
            var y = this.levelnum * 2 * UNIT
            y += GUI_SIZE
            y += this.levelnum * OFFSET
            y += BUFFER / 2
            y += UNIT
            this.points.push({
                x: 0, y: y,
                vector: ".",
                lvl: 1,
            })
        } else {
            var prevpoint = this.points[this.points.length - 1]

            var vectors = new Array()
            if(prevpoint.vector[0] == "-") {
                if(prevpoint.lvl < 2) {
                    vectors.push("\\")
                }
                if(prevpoint.lvl > 0) {
                    vectors.push("/")
                }
                if(prevpoint.lvl != 1
                && Math.random() < 0.25) {
                    vectors.push("|")
                }
            }
            if(prevpoint.vector == "/"
            && Math.random() < 0.5) {
                vectors.push("\\")
                if(prevpoint.lvl > 0) {
                    vectors.push("/")
                }
            } if(prevpoint.vector == "\\"
            && Math.random() < 0.5) {
                if(prevpoint.lvl < 2) {
                    vectors.push("\\")
                }
            }
            if(prevpoint.vector[0] != "-"
            || vectors.length == 0) {
                vectors.push("-")
                vectors.push("--")
                if(Math.random() < 0.5) {
                    vectors.push("---")
                }
                if(Math.random() < 0.5) {
                    vectors.push("----")
                }
            }

            var vector = vectors[Math.floor(Math.random() * vectors.length)]

            var lvl = prevpoint.lvl
            var x = prevpoint.x
            var y = prevpoint.y

            if(vector[0] == "-") {
                x += UNIT * vector.length
            } else {
                if(vector == "/") {
                    lvl -= 1
                    y -= UNIT
                } else if(vector == "\\") {
                    lvl += 1
                    y += UNIT
                } else if(vector == "|") {
                    if(lvl == 0) {
                        lvl = 2
                        y += UNIT * 2
                    } else if(lvl == 2) {
                        lvl = 0
                        y -= UNIT * 2
                    }
                    this.points.push({
                        x: x, y: y,
                        vector: vector,
                        lvl: lvl
                    })
                }
                x += UNIT
            }
            this.points.push({
                vector: vector,
                x: x, y: y,
                lvl: lvl
            })
        }
    }
    update(delta) {
        for(var index in this.points) {
            this.points[index].x -= this.speed
        }

        if(this.points[1].x < 0) {
            this.points.shift()
        }

        var endpoint = this.points[this.points.length - 2]
        if(endpoint.x < this.game.frame.width) {
            this.addAnotherPoint()
        }
    }
    y(x) {
        for(var i = 1; i < this.points.length; i++) {
            var a = this.points[i - 1]
            var b = this.points[i]
            if(a.x <= x && b.x > x) {
                var slope = (b.y - a.y) / (b.x - a.x)
                return slope * (x - a.x) + a.y
            }
        }
    }
}
