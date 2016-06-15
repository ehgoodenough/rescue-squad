const FRICTION = 0.5
const VERTICALITY = 10
const GRAVITY = 0.9
const MAX_GRAVITY = 8
const MAX_FALL_DISTANCE = UNIT * 1.5
const EQUIPMENT_SPEED = 0.9
const MAX_VELOCITY_BEFORE_JUMP = 5 // this is for the mechanic where you can jump when you just leave a cliff.

import {UNIT} from "../utility/Constants.js"

export default class Player {
    constructor(player) {
        this.position = player.position
        this.inputs = player.inputs
        this.width = player.width
        this.height = player.height
        this.color = player.color

        this.levelnum = 0
        this.mode = "parachuting"

        this.velocity = {x: 0, y: 0}
        this.acceleration = {x: 5, y: 8}
        this.jumpdist = 0

        this.equipment = {
            "parachutes": 2,
            "ropes": 2,
            "medkits": 1,
        }

        this.stack = 99
    }
    get child() {
        if(this.mode == "parachuting") {
            return {
                position: {
                    x: -1 * this.width,
                    y: -1 * (this.height + 8),
                },
                width: this.width * 3,
                height: this.height,
                color: "orange",
            }
        } else if(this.mode == "hiking") {
            var distance = this.position.y - this.stage.levels[this.levelnum - 1].y(this.position.x) - this.height
            return {
                position: {
                    x: (this.width - 4) * 0.5,
                    y: -1 * distance,
                },
                width: 4,
                height: distance,
                color: "white"
            }
        }
    }
    update(delta) {
        if(this.position.x - this.stage.levels[this.levelnum].speed > 0) {
            this.position.x -= this.stage.levels[this.levelnum].speed
        } else if(this.stage.levels[this.levelnum].y(this.position.x) - this.position.y < -VERTICALITY) {
            this.stage.mode = "died"
        }

        // vertical acceleration from inputs
        if(this.equipment.parachutes > 0
        && this.inputs.downwards.isJustDown(delta)
        && this.mode.match(/jumping|falling|dropping/)) {
            this.equipment.parachutes -= 1
            this.mode = "parachuting"
        }
        if(this.levelnum != 0
        && this.equipment.ropes > 0
        && this.inputs.upwards.isJustDown(delta)
        && this.mode.match(/jumping|falling|dropping/)) {
            this.equipment.ropes -= 1
            this.mode = "hiking"
        }

        if(this.mode == "on ground" && this.inputs.upwards.isDown()
        || this.mode == "on ledge" && this.inputs.upwards.isJustDown(delta)
        || this.mode == "falling" && this.velocity.y < MAX_VELOCITY_BEFORE_JUMP && this.inputs.upwards.isJustDown(delta)) {
            this.velocity.y = -this.acceleration.y
            this.jumpdist = this.position.y
            this.mode = "jumping"
        }
        if(this.inputs.downwards.isJustDown(delta)
        && ["on ledge", "on ground"].indexOf(this.mode) != -1) {
            if(this.levelnum < this.stage.levels.length - 1) {
                this.mode = "dropping"
                this.jumpdist = this.position.y
                this.levelnum += 1
            }
        }

        // horizontal acceleration from inputs
        if(this.mode != "hiking") {
            if(this.inputs.leftwards.isDown()) {
                this.velocity.x = -1 * this.acceleration.x
            }
            if(this.inputs.rightwards.isDown()) {
                this.velocity.x = +1 * this.acceleration.x
            }
        }

        // vertical acceleration from gravity
        if(["falling", "jumping", "dropping", "on ledge"].indexOf(this.mode) != -1) {
            this.velocity.y += GRAVITY
            if(this.velocity.y > MAX_GRAVITY) {
                this.velocity.y = MAX_GRAVITY
            }
        } else if(this.mode == "parachuting") {
            this.velocity.y = +EQUIPMENT_SPEED
        } else if(this.mode == "hiking") {
            this.velocity.y = -EQUIPMENT_SPEED
        }

        // query level
        var level = this.stage.levels[this.levelnum]

        // collision with camera
        if(this.position.x + this.velocity.x < 0
        || this.position.x + this.velocity.x > this.game.frame.width) {
            this.velocity.x = 0
        }

        // horizontal collision with level
        if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY) {
            this.velocity.x = 0
        }
        if(level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
            if(this.mode == "on ground") {
                this.mode = "falling"
                this.jumpdist = this.position.y
            }
        }

        // vertical collision with level
        if(this.mode == "jumping" || this.mode == "falling" || this.mode == "dropping" || this.mode == "parachuting") {
            if(this.levelnum > 0 && this.position.y < this.stage.levels[this.levelnum - 1].y(this.position.x + this.velocity.x)) {
                this.levelnum -= 1
            }
        }
        if(((this.mode == "jumping" && this.velocity.y > 0) || this.mode == "hiking")
        && this.levelnum > 0 && this.position.y - this.height < this.stage.levels[this.levelnum - 1].y(this.position.x + this.velocity.x)
        && level.y(this.position.x + this.velocity.x) - this.stage.levels[this.levelnum - 1].y(this.position.x + this.velocity.x) > this.height) {
            this.mode = "on ledge"
            this.levelnum -= 1
        }
        if(this.velocity.y > 0
        && this.position.y + this.velocity.y - (this.mode == "on ledge" ? this.height : 0) > level.y(this.position.x + this.velocity.x)) {
            this.position.y = level.y(this.position.x + this.velocity.x) + (this.mode == "on ledge" ? this.height : 0)
            if(["jumping", "falling", "dropping"].indexOf(this.mode) != -1) {
                if(this.position.y - this.jumpdist >= MAX_FALL_DISTANCE) {
                    this.stage.mode = "died"
                }
            }
            this.velocity.y = 0
            if(this.mode != "on ledge") {
                this.mode = "on ground"
            }
        }

        // translation from velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // translation from level
        if(this.mode == "on ground") {
            this.position.y = level.y(this.position.x)
        }

        // deceleration
        this.velocity.x = 0
    }
}

// ehgoodenoughs:
// - deceleration doesn't use friction
// - collision resolution doesn't push against collision
// - velocity is not preserved during acceleration
// - gravity is always applying, even when not necessary
// - vertical collision is ugly code
