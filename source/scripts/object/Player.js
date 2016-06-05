const FRICTION = 0.5
const VERTICALITY = 10
const GRAVITY = 0.9
const TOO_MUCH_GRAVITY = 10

export default class Player {
    constructor(player) {
        this.position = player.position
        this.inputs = player.inputs
        this.width = player.width
        this.height = player.height
        this.color = player.color

        this.level = 0
        this.mode = "falling"

        this.velocity = {x: 0, y: 0}
        this.acceleration = {x: 5, y: 8}

        this.stack = 99
    }
    update(delta) {
        if(this.position.x - this.game.stage.levels[this.level].speed > 0) {
            this.position.x -= this.game.stage.levels[this.level].speed
        } else if(this.game.stage.levels[this.level].y(this.position.x) - this.position.y < -VERTICALITY) {
            this.game.stage.mode = "game over"
        }

        // vertical acceleration from inputs
        if(this.mode == "on ground" && this.inputs["up"].isDown()
        || this.mode == "on ledge" && this.inputs["up"].isJustDown(delta)
        || this.mode == "falling" && this.velocity.y < 5 && this.inputs["up"].isJustDown(delta)) {
            this.velocity.y = -1 * this.acceleration.y
            this.mode = "jumping"
        }
        if(this.mode == "on ledge" && this.inputs["down"].isJustDown(delta)
        || this.mode == "on ground" && this.inputs["down"].isJustDown(delta)) {
            if(this.level < this.game.stage.levels.length - 1) {
                this.mode = "dropping"
                this.level += 1
            }
        }

        // horizontal acceleration from inputs
        if(this.inputs["left"].isDown()) {
            this.velocity.x = -1 * this.acceleration.x
        }
        if(this.inputs["right"].isDown()) {
            this.velocity.x = +1 * this.acceleration.x
        }

        // vertical acceleration from gravity
        this.velocity.y += GRAVITY

        // query level
        var level = this.game.stage.levels[this.level]

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
            }
        }

        // vertical collision with level
        if(this.mode == "jumping" || this.mode == "falling" || this.mode == "dropping") {
            if(this.level > 0 && this.position.y < this.game.stage.levels[this.level - 1].y(this.position.x + this.velocity.x)) {
                this.level -= 1
            }
        }
        if(this.mode == "jumping" && this.velocity.y > 0 && this.level > 0
        && this.position.y - this.height < this.game.stage.levels[this.level - 1].y(this.position.x + this.velocity.x)
        && level.y(this.position.x + this.velocity.x) - this.game.stage.levels[this.level - 1].y(this.position.x + this.velocity.x) > this.height) {
            this.mode = "on ledge"
            this.level -= 1
        }
        if(this.velocity.y > 0
        && this.position.y + this.velocity.y - (this.mode == "on ledge" ? this.height : 0) > level.y(this.position.x + this.velocity.x)) {
            this.position.y = level.y(this.position.x + this.velocity.x) + (this.mode == "on ledge" ? this.height : 0)
            if(this.velocity.y > TOO_MUCH_GRAVITY) {
                this.game.stage.mode = "game over"
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
// - vertical collision is ugly
