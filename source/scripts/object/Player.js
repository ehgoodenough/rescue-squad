import Input from "../utility/Input.js"

const FRICTION = 0.5
const GRAVITY = 0.8

export default class Player {
    constructor(player) {
        this.position = player.position
        this.width = player.width
        this.height = player.height
        this.color = player.color
    }
    update(delta) {
        // ...
    }
}
