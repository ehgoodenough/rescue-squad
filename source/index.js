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
    console.log("This is just a remake.")
}

/////////////////////////
///// Initializing /////
///////////////////////

import Game from "./scripts/object/Game.js"

var game = new Game({
    stagedata: [
        3, 5, 7,
        9, 11, 13
    ],
    colors: [
        "#5A3F80",
        "#92869E",
        "#57395B",
        "#222222",
    ],
    // from screenshots
    colors: "#5B749E #798A5D #45532D #222222 #DFE8F0".split(" "), //blue sky, forest green ground
    colors: "#C4F776 #80B080 #425A44 #222222".split(" "), //lime green sky, sick green ground
    colors: "#866E46 #73738F #3D3E5F #222222 #D6BAE2".split(" "), //brown sky, navy blue ground
    colors: "#AC8A72 #73738F #3C3C61 #222222 #D6BAE2".split(" "), //coffee brown sky, navy blue ground
    colors: "#8287C1 #75696D #463339 #222222 #E0F1E1".split(" "), //blue sky, gray brown ground
    colors: "#BBAC8D #5F868D #305158 #222222".split(" "), //tan sky, marine blue ground
    colors: "#534873 #798BA1 #3D464F #222222 #E29AA8".split(" "), //purple sky, blue ground (gradient'd)
    colors: "#E7AC80 #8C715C #471F41 #222222 #8C715C".split(" "), //yellow orange sky, burnt brown ground
    colors: "#2C212F #596154 #A1BD8D #222222 #B47E8E".split(" "), //dark purple sky, sick green invground
    colors: "#2A3036 #4A6259 #83B87A #222222 #968474".split(" "), //dark green blue sky, sick green invground
    colors: "#46303D #6D5E65 #AFAF93 #222222 #A5787B".split(" "), //dark red brown sky, brown and green invground
    colors: "#3E293C #564A6E #B1789B #222222 #A6798E".split(" "), //dark purple sky, off blue and pink invground
    // from palette
    colors: "#FEBDFF #7ACC77 #50A959 #222222".split(" "), //pink sky green ground
    colors: "#FFF8D1 #EB9ED6 #D971A2 #222222".split(" "), //yellow sky pink ground
    colors: "#F3CF85 #844620 #AA6A3A #222222".split(" "), //yellow sky brown invground
    colors: "#A8B3D0 #50A959 #2F8943 #222222".split(" "), //blue sky green ground
    colors: "#FFF0BB #E18C40 #DC4F1F #222222".split(" "), //yellow sky orangered ground
    colors: "#FFE3AF #AA6A3A #844620 #222222".split(" "), //yellow sky brown ground
    colors: "#8AAB80 #48402B #2F271C #222222".split(" "), //mint green sky, brown ground
})

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
