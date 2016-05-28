const UNIT = 32 // dimensions of a "tile" that makes up a level, 20x2
const OFFSET = 8 // gap between each level
const BUFFER = 360 - (((2 + 2 + 2) * UNIT) + OFFSET + OFFSET)

import {Beagle} from "./Entity.js"

export default class Level {
    constructor(level, color, vectors) {
        this.color = color
        this.points = new Array()
        this.vectors = vectors
        for(var x = 0, y = 1; x <= 23; x = x) {
            var vector = 0
            if(vectors.length > 0) {
                vector = vectors.shift()
            }

            this.points.push({
                x: x * UNIT,
                y: (y * UNIT) + (BUFFER / 2) + (level * (2 * UNIT)) + (level * OFFSET)
            })

            if(isNaN(vector)) {
                y += parseInt(vector + "2")
            } else {
                x += 1
                y += vector
            }
        }
        this.level = level
        // this.speed = 0.25 * (this.level / 3)
        this.speed = 0.5
    }
    y(x) {
        for(var i = 1; i < this.points.length; i++) {
            var a = this.points[i - 1], b = this.points[i]
            if(a.x <= x && b.x > x) {
                var slope = (b.y - a.y) / (b.x - a.x)
                return slope * (x - a.x) + a.y
            }
        }
    }
    update(delta) {
        for(var index in this.points) {
            this.points[index].x -= this.speed
        }

        var endpoint = this.points[this.points.length - 1]
        if(endpoint.x < this.game.frame.width) {
            var y = 0
            if(Math.random() < 0.5) {
                this.flip = (this.flip * -1) || +1
                y = UNIT * this.flip
            }
            this.points.push({
                x: endpoint.x + UNIT,
                y: endpoint.y + y
            })
            count += 1
            if(count == 7) {
                count = 0
                this.game.addTo("entities", new Beagle({
                    position: {
                        x: endpoint.x + UNIT,
                        y: endpoint.y + y
                    }
                }))
            }
        }
    }
}

var count = 0

// function getNextMovement(y) {
//     this.state = !this.state
//     var movements = new Array()
//     if(!!this.state) {
//         if(y == 0 || y == 1) {
//             movements.push({x: +1, y: +1})
//         }
//         if(y == 1 || y == 2) {
//             movements.push({x: +1, y: -1})
//         }
//         if(y == 0 && Math.random() < 0.25) {
//             movements.push({x: +0, y: +2})
//         }
//         if(y == 2 && Math.random() < 0.25) {
//             movements.push({x: +0, y: -2})
//         }
//     }
//     if(!this.state || movements.length == 0) {
//         movements.push({x: +1, y: +0})
//         movements.push({x: +2, y: +0})
//         movements.push({x: +3, y: +0})
//         movements.push({x: +4, y: +0})
//     }
//     return movements
// }
