import Input from "../utility/Input.js"

const FRICTION = 0.5
const GRAVITY = 0.8

export default class Player {
    constructor(player) {
        this.position = player.position
        this.width = player.width
        this.height = player.height
        this.color = player.color

        this.jumpforce = -9
        this.moveforce = +5

        this.acceleration = 5
        this.velocity = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
        this.maxvelocity = 5

        this.jumpheight = 0
    }
    update(delta) {
        // poll for movement
        if(Input.isDown("A")
        || Input.isDown("<left>")) {
            this.direction.x = -1
            this.velocity.x -= this.acceleration
            if(this.velocity.x < -this.maxvelocity) {
                this.velocity.x = -this.maxvelocity
            }
        } if(Input.isDown("D")
        || Input.isDown("<right>")) {
            this.direction.x = +1
            this.velocity.x += this.acceleration
            if(this.velocity.x > +this.maxvelocity) {
                this.velocity.x = +this.maxvelocity
            }
        }

        // poll for jumping
        if(Input.isDown("W")
        || Input.isDown("<up>")) {
            if(this.jumpheight == 0) {
                this.velocity.y = this.jumpforce
            }
        }

        // acceleration from gravity
        this.velocity.y += GRAVITY

        // collision with the edges of the camera
        // this.todo = "collision with the edges of the camera"

        // this.velocity.x = 0
        // this.velocity.y = 0
        // if(Input.isDown("W") || Input.isDown("<up>")) {
        //     this.velocity.y -= this.acceleration
        // } if(Input.isDown("S") || Input.isDown("<down>")) {
        //     this.velocity.y += this.acceleration
        // } if(Input.isDown("A") || Input.isDown("<left>")) {
        //     this.velocity.x -= this.acceleration
        // } if(Input.isDown("D") || Input.isDown("<right>")) {
        //     this.velocity.x += this.acceleration
        // }

        // collision with the world
        var level = this.game.levels[2]
        if(this.position.y > level.y(this.position.x + this.velocity.x)) {
            if(Math.abs(this.position.y - level.y(this.position.x + this.velocity.x)) < 7) {
                this.position.y = level.y(this.position.x + this.velocity.x)
            } else {
                this.velocity.x = 0
            }
        }
        if(this.position.y + this.velocity.y > level.y(this.position.x + this.velocity.x)) {
            this.position.y = level.y(this.position.x + this.velocity.x)
            this.velocity.y = 0
            this.jumpheight = 0
        }

        // translation from velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // measure the distance of a jump
        this.jumpheight += this.velocity.y

        // deceleration from friction
        this.velocity.x *= FRICTION

        // collision with other entities
        // this.todo = "collision with other entities"

        // conveyance via rendering
        // this.todo = "conveyance via rendering"

        // this.todo = "delta optimization"
        // this.todo = "parent access to other objects"
    }
}
