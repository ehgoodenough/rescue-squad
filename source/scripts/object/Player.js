const FRICTION = 0.5
const VERTICALITY = 10
const GRAVITY = 0.9
const MAX_GRAVITY = 8
const MAX_FALL_DISTANCE = UNIT * 1.5

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
    update(delta) {
        if(this.position.x - this.stage.levels[this.levelnum].speed > 0) {
            this.position.x -= this.stage.levels[this.levelnum].speed
        } else if(this.stage.levels[this.levelnum].y(this.position.x) - this.position.y < -VERTICALITY) {
            this.stage.mode = "game over"
        }

        // vertical acceleration from inputs
        if(this.equipment.parachutes > 0
        && this.inputs["down"].isJustDown(delta)
        && ["dropping", "falling", "jumping"].indexOf(this.mode) != -1) {
            this.equipment.parachutes -= 1
            this.mode = "parachuting"
        }
        if(this.levelnum > 0
        && this.equipment.ropes > 0
        && this.inputs["up"].isJustDown(delta)
        && ["dropping", "falling", "jumping"].indexOf(this.mode) != -1) {
            this.equipment.ropes -= 1
            this.mode = "hiking"
        }
        if(this.mode == "on ground" && this.inputs["up"].isDown()
        || this.mode == "on ledge" && this.inputs["up"].isJustDown(delta)
        || this.mode == "falling" && this.velocity.y < 5 && this.inputs["up"].isJustDown(delta)) {
            this.velocity.y = -1 * this.acceleration.y
            this.mode = "jumping"
            this.jumpdist = this.position.y
        }
        if(this.inputs["down"].isJustDown(delta)
        && ["on ledge", "on ground"].indexOf(this.mode) != -1) {
            if(this.levelnum < this.stage.levels.length - 1) {
                this.mode = "dropping"
                this.jumpdist = this.position.y
                this.levelnum += 1
            }
        }

        // horizontal acceleration from inputs
        if(this.mode != "hiking") {
            if(this.inputs["left"].isDown()) {
                this.velocity.x = -1 * this.acceleration.x
            }
            if(this.inputs["right"].isDown()) {
                this.velocity.x = +1 * this.acceleration.x
            }
        }

        // vertical acceleration from gravity
        if(this.mode == "falling"
        || this.mode == "jumping"
        || this.mode == "dropping"
        || this.mode == "on ledge") {
            this.velocity.y += GRAVITY
            if(this.velocity.y > MAX_GRAVITY) {
                this.velocity.y = MAX_GRAVITY
            }
        } else if(this.mode == "parachuting") {
            this.velocity.y = GRAVITY
        } else if(this.mode == "hiking") {
            this.velocity.y = -GRAVITY
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
                    this.stage.mode = "game over"
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
