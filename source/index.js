import React from "react"
import ReactDOM from "react-dom"

import Mount from "./scripts/render/Mount.js"

var colors = []
colors[0] = "#5A3F80"
colors[1] = "#92869E"
colors[2] = "#57395B"
colors[3] = "#222222"

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

const U = 32
const OFFSET = 8
const O = OFFSET

const BUFFER = 360 - (((2 + 2 + 2) * U) + O + O)

class Ground {
    constructor(i) {
        this.color = colors[i+1]
        this.points = new Array()
        for(var x = 0, y = 0; x <= 23; x = x) {
            this.points.push({
                x: x * U,
                y: (y * U) + (BUFFER / 2) + (i * (2 * U)) + (i * O)
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

const FRICTION = 0.5
const GRAVITY = 0.75

class Player {
    constructor(player) {
        this.position = player.position
        this.width = player.width
        this.height = player.height
        this.color = player.color

        this.jumpforce = -10
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
        this.todo = "collision with the edges of the camera"

        // collision with the world
        var ground = state.grounds[0]
        var y = ground.y(this.position.x + this.velocity.x)
        if(this.position.y + this.velocity.y > y) {
            var isCliff = Math.abs(this.position.y - y) > 16
            this.position.y = y
            this.velocity.y = 0
            this.jumpheight = 0
        }

        // translation from velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // track the distance of a jump
        this.jumpheight += this.velocity.y

        // deceleration from friction
        this.velocity.x *= 0.5

        // collision with other entities
        this.todo = "collision with other entities"

        // conveyance via rendering
        this.todo = "conveyance via rendering"

        this.todo = "delta optimization"
        this.todo = "parent access to other objects"
    }
}

import Loop from "./scripts/utility/Loop.js"
import Input from "./scripts/utility/Input.js"

var state = {
    frame: {
        width: 640,
        height: 360,
        color: colors[0]
    },
    player: new Player({
        position: {x: U * 4, y: U * 2},
        width: U * 0.5, height: U * 0.5,
        color: "#FFF"
    }),
    grounds: [
        new Ground(0),
        new Ground(1),
        new Ground(2),
    ]
}

var loop = new Loop(function(delta) {
    state.player.update(delta)
    render.setState(state)
})

if(STAGE == "DEVELOPMENT") {
    window.state = state
}
if(STAGE == "PRODUCTION") {
    document.addEventListener("keydown", (event) => {
        event.preventDefault()
    })
}

// start the player on the top
// move the player along whatever layer they're on
// let player jump and land on same layer
// let player jump and fall to next layer
// scroll the camera on a fixed speed for the player
// use parallax on different grounds; use in collision
// fall, jump, grab ledge, fall too far (> 2 levels), shoot, collect dogs, dog movies
// throw rope or deploy parachute. hit wall or lose dog, game over
// asthetics
// figure out the color gradients
// have little trees as background children
// select more colors for other stages
// polish
// highscores, both local and global

// http://www.colourpod.com/post/143168958975/paws-submitted-by-salison-5b5b78-8a86a5
