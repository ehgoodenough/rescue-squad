import Level from "./Level.js"
import Player from "./Player.js"
import {Beagle} from "./Entity.js"

import Input from "../utility/Input.js"
import ShortID from "shortid"

const UNIT = 32
const colors = [
    "#5A3F80",
    "#92869E",
    "#57395B",
    "#222222",
]

export default class Game {
    constructor() {
        this.add("player", new Player({
            position: {x: UNIT * 3, y: UNIT * 1},
            width: UNIT * 0.5, height: UNIT * 0.5,
            color: "#FFF",
            inputs: {
                "up": new Input(["W", "<up>"]),
                "down": new Input(["S", "<down>"]),
                "left": new Input(["A", "<left>"]),
                "right": new Input(["D", "<right>"]),
            }
        }))
        this.levels = [
            new Level(0, colors[1]),
            new Level(1, colors[2]),
            new Level(2, colors[3]),
        ]
        for(var index in this.levels) {
            this.levels[index].game = this
        }

        this.entityCountdown = 0

        this.frame = {
            width: 640,
            height: 360,
            color: colors[0]
        }
        this.entities = new Object()

        this.score = 100
        this.lives = 3
        this.dogs = 10
        this.stage = 1
    }
    add(label, object) {
        if(object instanceof Array) {
            this[label] = new Object()
            for(var index in object) {
                object[index].game = this
                object[index].key = ShortID.generate()

                this[label][object[index].key] = object[index]
            }
        } else {
            object.game = this
            object.key = ShortID.generate()

            this[label] = object
        }
    }
    addTo(label, object) {
        object.key = ShortID.generate()
        object.game = this

        this[label] = this[label] || new Object()
        this[label][object.key] = object
    }
    remove(label, object) {
        delete this[label][object.key]
    }
    update(delta) {
        this.levels.forEach((level) => {
            if(level.update instanceof Function) {
                level.update(delta)
            }
        })
        Object.keys(this.entities).forEach((key) => {
            var entity = this.entities[key]
            if(entity.update instanceof Function) {
                entity.update(delta)
            }
        })
        this.player.update(delta)

        this.entityCountdown -= delta / 1000
        if(this.entityCountdown <= 0) {
            this.entityCountdown = 5
            var level = this.levels[Math.floor(Math.random() * this.levels.length)]
            this.addTo("entities", new Beagle({
                position: {
                    x: level.points[level.points.length - 1].x,
                    y: level.points[level.points.length - 1].y,
                },
                level: level.level,
            }))
        }
    }
}
