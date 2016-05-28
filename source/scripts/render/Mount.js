import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Level from "./Level.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <Entity entity={this.state.player}/>
                    {Object.keys(this.state.entities).map((key) => {
                        var entity = this.state.entities[key]
                        return (
                            <Entity entity={entity} key={key}/>
                        )
                    })}
                    {this.state.levels.map((level, key) => {
                        return (
                            <Level level={level} key={key}
                                frame={this.state.frame}/>
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
