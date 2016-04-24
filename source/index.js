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
        var pattern = [
            {x: +2, y: 0},
            {x: +1, y: +1},
            {x: +2, y: 0},
            {x: +1, y: +1},
            {x: +2, y: 0},
            {x: +0, y: -2},
        ]
        this.points = new Array()
        for(var x = 0, y = 0; x <= 21; x = x) {
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
        movements.push({x: +2, y: +0})
        movements.push({x: +1, y: +0})
        return movements
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
    player: {
        position: {x: U * 4, y: U * 3},
        width: U * 0.5, height: U * 0.5,
        color: "#FFF"
    },
    grounds: [
        new Ground(0),
        new Ground(1),
        new Ground(2),
    ],
    oldgrounds: [
        {
            color: colors[1],
            points: [
                {x: U * 0, y: U * 3 + 0},
                {x: U * 2, y: U * 3 + 0},
                {x: U * 3, y: U * 4 + 0},
                {x: U * 5, y: U * 4 + 0},
                {x: U * 5, y: U * 2 + 0},
                {x: U * 7, y: U * 2 + 0},
                {x: U * 8, y: U * 3 + 0},
                {x: U * 10, y: U * 3 + 0},
                {x: U * 12, y: U * 3 + 0},
                {x: U * 13, y: U * 4 + 0},
                {x: U * 15, y: U * 4 + 0},
                {x: U * 15, y: U * 2 + 0},
                {x: U * 17, y: U * 2 + 0},
                {x: U * 17, y: U * 4 + 0},
            ]
        },
        {
            color: colors[2],
            points: [
                {x: U * 0, y: U * 4 + O},
                {x: U * 3 + O, y: U * 4 + O},
                {x: U * 3 + O, y: U * 6 + O},
                {x: U * 5 + O, y: U * 6 + O},
                {x: U * 6 + O, y: U * 5 + O},
                {x: U * 8 + O, y: U * 5 + O},
                {x: U * 9 + O, y: U * 6 + O},
                {x: U * 13 + O, y: U * 6 + O},
                {x: U * 14 + O, y: U * 5 + O},
                {x: U * 16 + O, y: U * 5 + O},
                {x: U * 17 + O, y: U * 4 + O},
            ]
        },
        {
            color: colors[3],
            points: [
                {x: U * 0, y: U * 8 + (2 * O)},
                {x: U * 2 + (2 + O), y: U * 8 + (2 * O)},
                {x: U * 3 + (2 + O), y: U * 7 + (2 * O)},
                {x: U * 5 + (2 + O), y: U * 7 + (2 * O)},
                {x: U * 6 + (2 + O), y: U * 6 + (2 * O)},
                {x: U * 8 + (2 + O), y: U * 6 + (2 * O)},
                {x: U * 8 + (2 + O), y: U * 8 + (2 * O)},
                {x: U * 12 + (2 + O), y: U * 8 + (2 * O)},
                {x: U * 13 + (2 + O), y: U * 7 + (2 * O)},
                {x: U * 16 + (2 + O), y: U * 7 + (2 * O)},
            ]
        }
    ]
}

var loop = new Loop(function(delta) {
    if(Input.isDown("W")
    || Input.isDown("<up>")) {
        entity.y -= entity.speed * delta
    } if(Input.isDown("S")
    || Input.isDown("<down>")) {
        entity.y += entity.speed * delta
    } if(Input.isDown("A")
    || Input.isDown("<left>")) {
        entity.x -= entity.speed * delta
    } if(Input.isDown("D")
    || Input.isDown("<right>")) {
        entity.x += entity.speed * delta
    }
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

// fix ratio of tiles and layers and stuff
// figure out the color gradients
// generate the grounds yourself
// - do not let grounds cross each other
// - move forward 2, slope up or down 1, or ledge up or down 2
// use parallax on different grounds; use in collision
// have little trees as background children
// fall, jump, grab ledge, fall too far (> 2 levels), shoot, collect dogs, dog movies
// throw rope or deploy parachute. hit wall or lose dog, game over

// http://www.colourpod.com/post/143168958975/paws-submitted-by-salison-5b5b78-8a86a5
