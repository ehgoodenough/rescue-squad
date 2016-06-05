const UNIT = 32
const VERTICALITY = 10

import {getDistance} from "../utility/Geometry.js"

export class Beagle {
    constructor(beagle) {
        this.position = beagle.position
        this.level = beagle.level

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

        // collision with level
        var level = this.game.stage.levels[this.level]
        this.position.x -= level.speed
        if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY
        || level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
            this.direction *= -1
            this.velocity.x = 0
        }

        // collision with camera
        if(this.velocity.x > 0 && this.position.x + this.velocity.x > this.game.frame.width) {
            this.direction *= -1
            this.velocity.x = 0
        }

        this.position.x += this.velocity.x
        this.position.y = level.y(this.position.x)

        // collision with player
        if(getDistance(this.position, this.game.stage.player.position) < this.width * 0.75) {
            this.game.stage.remove("entities", this)
            this.game.stage.dogs -= 1
            this.game.score += 100
            if(this.game.stage.dogs <= 0) {
                this.game.stage.dogs = 0
                this.game.stage.mode = "complete"
            }
        }

        // collision with camera
        if(this.position.x <= -1 * this.width) {
            this.game.stage.remove("entities", this)
            this.game.stage.mode = "lost a beagle"
        }
    }
}

export class Equipment {
    constructor(equipment) {
        this.position = equipment.position
        this.level = equipment.level

        this.width = UNIT * 0.4
        this.height = UNIT * 0.4

        this.type = equipment.type
        this.color = equipment.type == "parachute" ? "orange" : "gray"

        this.incline = equipment.incline
    }
    update(delta) {
        var level = this.game.stage.levels[this.level]
        this.position.x -= level.speed
        this.position.y = level.y(this.position.x)

        // collision with player
        if(getDistance(this.position, this.game.stage.player.position) < this.width * 0.75) {
            this.game.stage.remove("entities", this)
            if(this.type == "parachute") {
                this.game.stage.player.equipment.parachutes += 1
            } else {
                this.game.stage.player.equipment.ropes += 1
            }
        }

        // collision with camera
        if(this.position.x <= -1 * this.width) {
            this.game.stage.remove("entities", this)
        }
    }
}
