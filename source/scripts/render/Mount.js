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
                    <Entity entity={this.state.game.player}/>
                    {Object.keys(this.state.game.entities).map((key) => {
                        var entity = this.state.game.entities[key]
                        return (
                            <Entity entity={entity} key={key}/>
                        )
                    })}
                    {this.state.game.levels.map((level, key) => {
                        return (
                            <Level level={level} key={key}
                                frame={this.state.game.frame}/>
                        )
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
