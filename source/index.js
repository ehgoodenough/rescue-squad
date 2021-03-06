//   ___ ___ ___ ___ _ _ ___
//  |  _| -_|_ -|  _| | | -_|
//  |_| |___|___|___|___|___|
//   _   _          _               _
//  | |_| |_ ___   | |_ ___ ___ ___| |___ ___
//  |  _|   | -_|  | . | -_| .'| . | | -_|_ -|
//  |_| |_|_|___|  |___|___|__,|_  |_|___|___|
//                             |___|

if(STAGE == "PRODUCTION") {
    console.log("Rescue the Beagles is a game by Nenad Jalsovec in 2008.")
    console.log("%chttp://www.16x16.org/category/rescue-the-beagles", "color: #00C")
    console.log("This is just a tribute.")
}

/////////////////////////
///// Initializing /////
///////////////////////

import State from "./scripts/object/State.js"
var state = new State()

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
    state.update(delta)
    render.setState(state)
})

///////////////////
///// Inputs /////
/////////////////

import vkey from "vkey"
import Screenfull from "screenfull"

if(PLATFORM == "DESKTOP") {
    document.addEventListener("keydown", function(event) {
        if(vkey[event.keyCode] == "F" && event.ctrlKey == true) {
            Screenfull.toggle()
        }
    })
}

if(STAGE == "PRODUCTION") {
    document.addEventListener("keydown", function(event) {
        event.preventDefault()
    })
}
