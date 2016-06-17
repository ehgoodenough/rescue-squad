import React from "react"

export default class Entity extends React.Component {
    render() {
        return (
            <div style={this.style}>
                {this.effect}
            </div>
        )
    }
    get style() {
        return {
            position: "absolute",
            zIndex: this.props.entity.stack || 1,
            width: Math.floor(this.props.entity.width) + "px",
            height: Math.floor(this.props.entity.height) + "px",
            top: Math.floor(this.props.entity.position.y) + "px",
            left: Math.floor(this.props.entity.position.x) + "px",
            marginTop: Math.floor(-1 * this.props.entity.height) + "px",
            marginLeft: Math.floor(-0.5 * this.props.entity.width) + "px",
            backgroundColor: this.props.entity.color,
            transformOrigin: "50% 100% 0px",
            transform: "rotateZ(" + (this.props.entity.incline || 0) +"deg)",
        }
    }
    get effect() {
        if(!!this.props.entity.effect) {
            return <EntityEffect effect={this.props.entity.effect}/>
        }
    }
}

class EntityEffect extends React.Component {
    render() {
        return (
            <div style={this.style}/>
        )
    }
    get style() {
        return {
            position: "relative",
            width: this.props.effect.width + "px",
            height: this.props.effect.height + "px",
            top: this.props.effect.position.y + "px",
            left: this.props.effect.position.x + "px",
            backgroundColor: this.props.effect.color,
        }
    }
}
