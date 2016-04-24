import React from "react"
import ReactDOM from "react-dom"

import AspectRatioFrame from "./scripts/render/AspectRatioFrame.js"

class Mountain extends React.Component {
    render() {
        return (
            <svg>
                <polygon fill={this.fill} points={this.points}/>
            </svg>
        )
    }
    get fill() {
        return this.props.mountain.color || "#444"
    }
    get points() {
        return this.props.mountain.points.map((point) => {
            return point.x + "," + point.y
        }).join(" ")
    }
}

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame frame={this.state.frame}>
                    {this.state.mountains.map((mountain, key) => {
                        return <Mountain key={key} mountain={mountain}/>
                    })}
                </AspectRatioFrame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

var render = ReactDOM.render(<Mount/>, document.getElementById("mount"))

import Loop from "./scripts/utility/Loop.js"
import Input from "./scripts/utility/Input.js"

var frame = {width: 640, height: 360}
const U = 40 // unit for a tile
const O = 8 // offset between layers

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
    render.setState({
        frame: frame,
        mountains: [
            {
                color: "#C00",
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
                    {x: frame.width, y: frame.height},
                    {x: 0, y: frame.height},
                ]
            },
            {
                color: "#900",
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
                    {x: frame.width, y: frame.height},
                    {x: 0, y: frame.height},
                ]
            },
            {
                color: "#300",
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
                    {x: frame.width, y: frame.height},
                    {x: 0, y: frame.height},
                ]
            }
        ]
    })
})

if(STAGE == "PRODUCTION") {
    document.addEventListener("keydown", (event) => {
        event.preventDefault()
    })
}

// get better name than "mountain"
// figure out the color gradients
// generate the mountains yourself
// - do not let mountains cross each other
// - move forward 2, slope up or down 1, or ledge up or down 2
// use parallax on different mountains; use in collision
// have little trees as background children
// fall, jump, grab ledge, fall too far (> 2 levels), shoot, collect dogs, dog movies
// throw rope or deploy parachute. hit wall or lose dog, game over
