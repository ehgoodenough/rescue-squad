import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Level from "./Level.js"
import GUI from "./GUI.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.game.frame}>
                    <GUI game={this.state.game}/>
                    <Entity entity={this.state.game.stage.player}/>
                    {Object.keys(this.state.game.stage.entities || {}).map((key) => {
                        if(key != "length") {
                            var entity = (this.state.game.stage.entities || {})[key]
                            return (
                                <Entity entity={entity} key={key}/>
                            )
                        }
                    })}
                    {Object.keys(this.state.game.stage.levels || {}).map((key) => {
                        if(key != "length") {
                            var level = (this.state.game.stage.levels || {})[key]
                            return (
                                <Level level={level} key={key}
                                    frame={this.state.game.frame}/>
                            )
                        }
                    })}
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}
