import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Ground from "./Ground.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <Ground ground={this.state.grounds[0]} frame={this.state.frame}/>
                    <Ground ground={this.state.grounds[1]} frame={this.state.frame}/>
                    <Ground ground={this.state.grounds[2]} frame={this.state.frame}/>
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
