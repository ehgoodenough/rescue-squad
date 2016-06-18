import React from "react"

export default class GUI extends React.Component {
    render() {
        return (
            <div className="gui">
                <div className="bar">
                    <div className="inventory">
                        <div className="continues status">
                            <span className="icon" style={{backgroundColor: "white"}}/>
                            <span>{this.props.game.continues}</span>
                        </div>
                        <div className="parachutes status">
                            <span className="icon" style={{backgroundColor: "orange"}}/>
                            <span>{this.props.game.stage.player.equipment.parachutes}</span>
                        </div>
                        <div className="climbing-ropes status">
                            <span className="icon" style={{backgroundColor: "gray"}}/>
                            <span>{this.props.game.stage.player.equipment.ropes}</span>
                        </div>
                        <div className="medical-kits status">
                            <span className="icon" style={{backgroundColor: "white"}}/>
                            <span>{this.props.game.stage.player.equipment.medkits}</span>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="stage">Level {this.props.game.stage.stagenum + 1}:</span>
                        <span className="score">{this.pad(this.props.game.score)}</span>
                    </div>
                </div>
                <div className="rescues status">
                    <span className="icon" style={{backgroundColor: "white"}}/>
                    <span>{this.props.game.stage.rescues}</span>
                </div>
                {this.props.game.stage.mode == "complete" ? (
                    <div className="message">
                        <h1>RESCUED THE BEAGLES</h1>
                    </div>
                ) : null}
                {this.props.game.stage.mode == "died" ? (
                    <div className="message">
                        <h1>DIED PAINFULLY</h1>
                        <h2>HIT ANY KEY TO CONTINUE</h2>
                    </div>
                ) : null}
                {this.props.game.stage.mode == "lost a beagle" ? (
                    <div className="message">
                        <h1>LOST A BEAGLE</h1>
                    </div>
                ) : null}
                {this.props.game.stage.mode == "game over" ? (
                    <div className="message">
                        <h1>GAME OVER</h1>
                    </div>
                ) : null}
            </div>
        )
    }
    pad(number) {
        number = number + ""
        number = (number < 10 ? 0 : "") + number
        number = (number < 100 ? 0 : "") + number
        return number
    }
}
