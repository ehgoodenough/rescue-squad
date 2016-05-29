import React from "react"

export default class GUI extends React.Component {
    render() {
        return (
            <div className="gui">
                <div className="bar">
                    <div className="parachute equipment">
                        <span className="icon"/>
                        <span className="amount">
                            3
                        </span>
                    </div>
                    <div className="rope equipment">
                        <span className="icon"/>
                        <span className="amount">
                            2
                        </span>
                    </div>
                    <div className="medkit equipment">
                        <span className="icon"/>
                        <span className="amount">
                            1
                        </span>
                    </div>
                    <div className="score">
                        {pad(this.props.game.stage.score)}
                    </div>
                    <div className="stage">
                        Level {this.props.game.stage.stage}:
                    </div>
                </div>
                <div className="dogs">
                    <span className="icon"/>
                    <span className="amount">
                        {this.props.game.stage.dogs}
                    </span>
                </div>
            </div>
        )
    }
}

function pad(number) {
    number = "" + number
    number = (number < 10 ? 0 : "") + number
    number = (number < 100 ? 0 : "") + number
    return number
}
