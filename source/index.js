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
    game.update(delta)
    render.setState({
        "game": game
    })
})
