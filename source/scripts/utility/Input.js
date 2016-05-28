import vkey from "vkey"

var Keyb = {
    isDown: function(key) {
        return !!this.data[key]
    },
    isUp: function(key) {
        return !this.data[key]
    },
    isJustDown: function(key, delta) {
        return window.performance.now() - this.data[key] < delta
    },
    setDown: function(key) {
        this.data[key] = window.performance.now()
    },
    setUp: function(key) {
        delete this.data[key]
    },
    data: {}
}

document.addEventListener("keydown", function(event) {
    if(Keyb.isUp(vkey[event.keyCode])) {
        Keyb.setDown(vkey[event.keyCode])
    }
})

document.addEventListener("keyup", function(event) {
    Keyb.setUp(vkey[event.keyCode])
})

class Input {
    constructor(inputs) {
        if(inputs.constructor != Array) {
            this.inputs = new Array()
            this.inputs.push(inputs)
        } else {
            this.inputs = inputs
        }
    }
    static isDown(input) {
        return Keyb.isDown(input)
    }
    static isJustDown(input, delta) {
        return Keyb.isJustDown(input, delta)
    }
    isDown() {
        return this.inputs.some((input) => {
            return Keyb.isDown(input)
        })
    }
    isJustDown(delta) {
        return this.inputs.some((input) => {
            return Keyb.isJustDown(input, delta)
        })
    }
}

export default Input
