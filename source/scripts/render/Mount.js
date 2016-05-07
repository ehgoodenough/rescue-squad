import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Level from "./Level.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <Level level={this.state.levels[0]} frame={this.state.frame}/>
                    <Level level={this.state.levels[1]} frame={this.state.frame}/>
                    <Level level={this.state.levels[2]} frame={this.state.frame}/>
                    <Entity entity={this.state.player}/>
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}
