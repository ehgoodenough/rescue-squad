const UNIT = 32
const VERTICALITY = 10
const GRAVITY = 0.9
const MAX_GRAVITY = 8

import {getDistance} from "../utility/Geometry.js"

export class Beagle {
    constructor(beagle) {
        this.position = beagle.position
        this.levelnum = beagle.levelnum

        this.width = UNIT * 0.5
        this.height = UNIT * 0.5

        this.color = "#FFF"

        this.velocity = {x: 0, y: 0}
        this.direction = -1
        this.speed = 1
        this.mode = "walking"
    }
    update(delta) {
        if(!this.velocity.x) {
            this.velocity.x = this.direction * this.speed
        }

        // collision with level
        var level = this.stage.levels[this.levelnum]
        this.position.x -= level.speed
        if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY) {
            this.direction *= -1
            this.velocity.x = 0
        } else if(level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
            this.mode = "falling"
        }
        if(this.position.x + this.velocity.x > level.points[level.points.length - 1].x) {
            this.direction *= -1
            this.velocity.x = 0
        }

        if(this.mode == "falling") {
            this.velocity.y += GRAVITY
            if(this.velocity.y > MAX_GRAVITY) {
                this.velocity.y = MAX_GRAVITY
            }
            if(this.position.y + this.velocity.y > level.y(this.position.x + this.velocity.x)) {
                this.velocity.y = 0
                this.mode = "walking"
            }
        }

        this.position.x += this.velocity.x
        if(this.mode == "walking") {
            this.position.y = level.y(this.position.x)
        } else if(this.mode == "falling") {
            this.position.y += this.velocity.y
        }

        // collision with player
        if(getDistance(this.position, this.stage.player.position) < this.width * 0.75) {
            this.stage.remove("entities", this)
            this.stage.rescues -= 1
            this.game.score += 100
            if(this.stage.rescues <= 0) {
                this.stage.rescues = 0
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

        this.incline = equipment.position.r
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

export class Scientist {
    constructor(scientist) {
        this.position = scientist.position
        this.levelnum = scientist.levelnum
        this.type = scientist.type

        if(scientist.type == "blob") {
            this.width = UNIT * 0.5
            this.height = UNIT * 0.25

            this.color = "#C00"
            this.incline = scientist.position.r
        } else if(scientist.type == "biohazdude") {
            this.width = UNIT * 0.5
            this.height = UNIT * 0.7
            this.color = "#444"

            this.velocity = {x: 0, y: 0}
            this.distance = 2000
            this.mode = "walking"
            this.direction = -1
            this.speed = 0.5
        }
    }
    update(delta) {
        var level = this.stage.levels[this.levelnum]
        this.position.x -= level.speed

        if(this.type == "biohazdude") {
            if(this.mode == "walking") {
                if(this.velocity.x == 0) {
                    this.velocity.x = this.direction * this.speed
                }
            } else if(this.mode == "waiting"){
                this.velocity.x = 0
            }

            // collision with level; bounce off cliffs and right side of the screen
            if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY
            || level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
                this.direction *= -1
                this.velocity.x = 0
            }
            if(this.position.x + this.velocity.x > level.points[level.points.length - 1].x) {
                this.direction *= -1
                this.velocity.x = 0
            }

            // translation
            this.position.x += this.velocity.x
            this.position.y = level.y(this.position.x)

            this.distance -= delta
            if(this.distance <= 0) {
                if(this.mode == "walking") {
                    this.mode = "waiting"
                    this.distance = Math.random() * 1000 + 1000
                } else {
                    this.mode = "walking"
                    this.distance = Math.random() * 3000 + 2000
                }
            }
        }

        // collision with player
        if(getDistance(this.position, this.stage.player.position) < this.width) {
            this.stage.mode = "died"
        }

        // collision with camera
        if(this.position.x <= -1 * this.width) {
            this.stage.remove("entities", this)
        }
    }
}
