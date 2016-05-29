//   ___ ___ ___ ___ _ _ ___
//  |  _| -_|_ -|  _| | | -_|
//  |_| |___|___|___|___|___|
//   _   _          _               _
//  | |_| |_ ___   | |_ ___ ___ ___| |___ ___
//  |  _|   | -_|  | . | -_| .'| . | | -_|_ -|
//  |_| |_|_|___|  |___|___|__,|_  |_|___|___|
//                             |___|

// console.log("Rescue the Beagles is a game by Nenad Jalsovec in 2008.")
// console.log("%chttp://www.16x16.org/category/rescue-the-beagles", "color: #00C")
// console.log("This is just a remake.")

/////////////////////////
///// Initializing /////
///////////////////////

import Game from "./scripts/object/Game.js"

var game = new Game()

if(STAGE == "DEVELOPMENT") {
    window.game = game
}

//////////////////////
///// Rendering /////
////////////////////

import React from "react"
import ReactDOM from "react-dom"

import Mount from "./scripts/render/Mount.js"

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

////////////////////
///// Looping /////
//////////////////

import Loop from "./scripts/utility/Loop.js"

var loop = new Loop(function(delta) {
    if(game.mode != "complete") {
        game.update(delta)
    } else {
        // show score
    }
    render.setState({
        "game": game
    })
})

// pause the game when the game is won
// maybe eventually put everything into
// a "stage" object, with three levels
// all entities and player. The stage
// can be easily re-instantiated for
// restarting the stage (game over)
// or moving to the next stage (win).
