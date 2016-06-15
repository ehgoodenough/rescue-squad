import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Stage from "./Stage.js"
import GUI from "./GUI.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <GUI game={this.state.game}/>
                    <div className="gameplay">
                        <Entity entity={this.state.game.stage.player}/>
                        {Object.keys(this.state.game.stage.entities || {}).map((key) => {
                            if(key != "length") {
                                var entity = (this.state.game.stage.entities || {})[key]
                                return (
                                    <Entity entity={entity} key={key}/>
                                )
                            }
                        })}
                        <Stage stage={this.state.game.stage} frame={this.state.frame}/>
                    </div>
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}
