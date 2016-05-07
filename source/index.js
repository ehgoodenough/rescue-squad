import Game from "./scripts/object/Game.js"
import Loop from "./scripts/utility/Loop.js"

var game = new Game()

import React from "react"
import ReactDOM from "react-dom"

import Mount from "./scripts/render/Mount.js"

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

var loop = new Loop(function(delta) {
    game.player.update(delta)
    render.setState(game)
})

if(STAGE == "DEVELOPMENT") {
    window.game = game
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
// use parallax on different levels; use in collision
// fall, jump, grab ledge, fall too far (> 2 levels), shoot, collect dogs, dog movies
// throw rope or deploy parachute. hit wall or lose dog, game over
// asthetics
// figure out the color gradients
// have little trees as backlevel children
// select more colors for other stages
// polish
// highscores, both local and global

// http://www.colourpod.com/post/143168958975/paws-submitted-by-salison-5b5b78-8a86a5
