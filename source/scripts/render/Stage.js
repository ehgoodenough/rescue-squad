import React from "react"

export default class Stage extends React.Component {
    render() {
        return (
            <svg style={this.style}>
                {!!this.props.stage.colors[4] ? (
                    <Sun color={this.props.stage.colors[4]}/>
                ) : null}
                {Object.keys(this.props.stage.levels || {}).map((key) => {
                    if(key != "length") {
                        var level = (this.props.stage.levels || {})[key]
                        return (
                            <Level level={level} key={key}
                                frame={this.props.frame}/>
                        )
                    }
                })}
            </svg>
        )
    }
    get style() {
        return {
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: this.props.stage.colors[0],
        }
    }
}

class Sun extends React.Component {
    render() {
        return (
            <circle cx="480" cy="140" r="100" fill={this.props.color}/>
        )
    }
}

class Level extends React.Component {
    render() {
        return (
            <polygon fill={this.fill} points={this.points}/>
        )
    }
    get fill() {
        return this.props.level.color || "#444"
    }
    get points() {
        var points = this.props.level.points.concat([
            {x: this.props.frame.width, y: this.props.frame.height},
            {x: 0, y: this.props.frame.height}
        ])

        return points.map((point) => {
            return point.x + "," + point.y
        }).join(" ")
    }
}
