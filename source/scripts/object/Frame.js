export default class Frame {
    constructor(protoframe) {
        this.width = protoframe.width || 640
        this.height = protoframe.height || 360
        this.color = protoframe.color || "#222"
    }
}
