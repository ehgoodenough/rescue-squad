import React from "react"

export default class Ground extends React.Component {
    render() {
        return (
            <svg>
                <polygon fill={this.fill} points={this.points}/>
            </svg>
        )
    }
    get fill() {
        return this.props.ground.color || "#444"
    }
    get points() {
        return this.props.ground.points.concat([
            {x: this.props.frame.width, y: this.props.frame.height},
            {x: 0, y: this.props.frame.height},
        ]).map((point) => {
            return point.x + "," + point.y
        }).join(" ")
    }
}
