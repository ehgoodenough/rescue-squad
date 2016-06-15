const UNIT = 32
const VERTICALITY = 10

import {getDistance} from "../utility/Geometry.js"

export class Beagle {
    constructor(beagle) {
        this.position = beagle.position
        this.levelnum = beagle.levelnum

        this.width = UNIT * 0.5
        this.height = UNIT * 0.5

        this.color = "#FFF"

        this.velocity = {}
        this.direction = -1
        this.speed = 1
    }
    update(delta) {
        if(!this.velocity.x) {
            this.velocity.x = this.direction * this.speed
        }

        // collision with this.levelnum
        var level = this.stage.levels[this.levelnum]
        this.position.x -= level.speed
        if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY
        || level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
            this.direction *= -1
            this.velocity.x = 0
        }

        // collision with camera
        if(this.velocity.x > 0 && this.position.x + this.velocity.x > this.game.state.frame.width) {
            this.direction *= -1
            this.velocity.x = 0
        }

        this.position.x += this.velocity.x
        this.position.y = level.y(this.position.x)

        // collision with player
        if(getDistance(this.position, this.stage.player.position) < this.width * 0.75) {
            this.stage.remove("entities", this)
            this.stage.dogs -= 1
            this.game.score += 100
            if(this.stage.dogs <= 0) {
                this.stage.dogs = 0
                this.stage.mode = "complete"
            }
        }

        // collision with camera
        if(this.position.x <= -1 * this.width) {
            this.stage.remove("entities", this)
            this.stage.mode = "lost a beagle"
        }
    }
}

export class Equipment {
    constructor(equipment) {
        this.position = equipment.position
        this.levelnum = equipment.levelnum

        this.width = UNIT * 0.4
        this.height = UNIT * 0.4

        this.type = equipment.type
        this.color = equipment.type == "parachute" ? "orange" : "gray"

        this.incline = equipment.incline
    }
    update(delta) {
        var level = this.stage.levels[this.levelnum]
        this.position.x -= level.speed
        this.position.y = level.y(this.position.x)

        // collision with player
        if(getDistance(this.position, this.stage.player.position) < this.width * 0.75) {
            this.stage.remove("entities", this)
            if(this.type == "parachute") {
                this.stage.player.equipment.parachutes += 1
            } else {
                this.stage.player.equipment.ropes += 1
            }
        }

        // collision with camera
        if(this.position.x <= -1 * this.width) {
            this.stage.remove("entities", this)
        }
    }
}
