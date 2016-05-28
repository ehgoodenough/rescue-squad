const FRICTION = 0.5
const VERTICALITY = 10

export default class Player {
    constructor(player) {
        this.position = player.position
        this.inputs = player.inputs
        this.width = player.width
        this.height = player.height
        this.color = player.color

        this.level = 0
        this.mode = "walking"

        this.velocity = {x: 0, y: 0}
        this.acceleration = 5
    }
    update(delta) {
        if(this.mode == "walking") {
            if(this.inputs["up"].isJustDown()) {
                if(this.level > 0) {
                    this.level -= 1
                }
            }
            if(this.inputs["down"].isJustDown()) {
                if(this.level < 2) {
                    this.level += 1
                }
            }

            var level = this.game.levels[this.level]

            if(this.inputs["left"].isDown()) {
                this.velocity.x = -1 * this.acceleration
            }

            if(this.inputs["right"].isDown()) {
                this.velocity.x = +1 * this.acceleration
            }

            // collision with camera
            if(this.position.x + this.velocity.x < 0
            || this.position.x + this.velocity.x > this.game.frame.width) {
                this.velocity. x = 0
            }

            // collision with level
            var dy = level.y(this.position.x + this.velocity.x) - this.position.y
            if(dy < -VERTICALITY) {
                console.log("JUMP")
                this.velocity.x = 0
            }
            if(dy > +VERTICALITY) {
                console.log("FALL")
            }

            // translation
            this.position.x += this.velocity.x
            this.position.y = level.y(this.position.x)

            // deceleration
            this.velocity.x = 0
        }
    }
}

// ehgoodenoughs:
// - deceleration doesn't use friction
// - collision resolution doesn't push against collision
// - velocity is not preserved during acceleration
