const UNIT = 32 // dimensions of a "tile" that makes up a level, 20x2
const OFFSET = 8 // gap between each level
const BUFFER = 360 - (((2 + 2 + 2) * UNIT) + OFFSET + OFFSET)

export default class Level {
    constructor(i, color) {
        this.color = color
        this.points = new Array()
        for(var x = 0, y = 0; x <= 23; x = x) {
            this.points.push({
                x: x * UNIT,
                y: (y * UNIT) + (BUFFER / 2) + (i * (2 * UNIT)) + (i * OFFSET)
            })
            var movements = this.getMovements(y)
            var movement = movements[Math.floor(Math.random() * movements.length)]
            x += movement.x
            y += movement.y
        }
    }
    getMovements(y) {
        var movements = []
        this.flip = !this.flip
        if(this.flip) {
            if(y == 0 || y == 1) {
                movements.push({x: +1, y: +1})
            }
            if(y == 1 || y == 2) {
                movements.push({x: +1, y: -1})
            }
            if(y == 0) {
                movements.push({x: +0, y: +2})
            }
            if(y == 2) {
                movements.push({x: +0, y: -2})
            }
        } else {
            movements.push({x: +1, y: +0})
            movements.push({x: +2, y: +0})
            movements.push({x: +3, y: +0})
            movements.push({x: +4, y: +0})
        }
        return movements
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
}
