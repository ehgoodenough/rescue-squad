import React from "react"

export default class Entity extends React.Component {
    render() {
        return (
            <div style={this.style}>
                {!!this.props.entity.child ? <Child child={this.props.entity.child}/> : null}
            </div>
        )
    }
    get style() {
        return {
            position: "absolute",
            zIndex: this.props.entity.stack || 1,
            width: this.props.entity.width + "px",
            height: this.props.entity.height + "px",
            top: this.props.entity.position.y + "px",
            left: this.props.entity.position.x + "px",
            marginTop: -1 * this.props.entity.height + "px",
            marginLeft: -0.5 * this.props.entity.width + "px",
            backgroundColor: this.props.entity.color,
            transformOrigin: "50% 100% 0px",
            transform: "rotateZ(" + (this.props.entity.incline || 0) +"deg)",
        }
    }
}

class Child extends React.Component {
    render() {
        return (
            <div style={this.style}/>
        )
    }
    get style() {
        return {
            position: "relative",
            width: this.props.child.width + "px",
            height: this.props.child.height + "px",
            top: this.props.child.position.y + "px",
            left: this.props.child.position.x + "px",
            backgroundColor: this.props.child.color,
        }
    }
}
