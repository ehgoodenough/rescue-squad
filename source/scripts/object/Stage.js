import Level from "./Level.js"
import Player from "./Player.js"
import {Beagle, Equipment} from "./Entity.js"

import {UNIT} from "../utility/Constants.js"
import Input from "../utility/Input.js"

import ShortID from "shortid"

export default class Stage {
    constructor(game, stage) {
        this.game = game

        this.entities = new Object()

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
        }), false)
        this.add("levels", new Level(0, stage.colors[1]), 0)
        this.add("levels", new Level(1, stage.colors[2]), 1)
        this.add("levels", new Level(2, stage.colors[3]), 2)

        this.entityCountdown = 0
        this.timerToNextStage = 3

        this.dogs = stage.dogs
        this.stage = stage.stage || 1
        this.colors = stage.colors





    }
    add(label, object, key) {
        object.stage = this
        object.game = this.game

        if(key != undefined) {
            object.key = key
        } else {
            object.key = ShortID.generate()
        }

        if(key === false) {
            this[label] = object
        } else {
            this[label] = this[label] || new Object()
            this[label][object.key] = object
            this[label].length = (this[label].length || 0) + 1
        }
    }
    remove(label, object) {
        delete this[label][object.key]
        this[label].length -= 1
    }
    update(delta) {
        if(this.mode == "complete"
        || this.mode == "game over"
        || this.mode == "lost a beagle") {
            this.timerToNextStage -= delta / 1000
            if(this.timerToNextStage <= 0
            || Input.isJustDown("<space>", delta)) {
                this.game.stage = new Stage(this.game, {
                    stage: this.stage + (this.mode == "complete" ? 1 : 0),
                    dogs: (this.mode == "complete" ? 5 : this.dogs),
                    colors: this.colors,
                })
            }
        } else {
            Object.keys(this.levels).forEach((key) => {
                var level = this.levels[key]
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

            if(Input.isJustDown("<space>", delta)) {
                throw -1
            }

            this.entityCountdown -= delta / 1000
            if(this.entityCountdown <= 0) {
                this.entityCountdown = 5
                var level = this.levels[Math.floor(Math.random() * this.levels.length)]
                if(Math.random() < 0.5) {
                    this.add("entities", new Beagle({
                        position: {
                            x: level.points[level.points.length - 1].x,
                            y: level.points[level.points.length - 1].y,
                        },
                        level: level.level,
                    }))
                } else {
                    var a = level.points[level.points.length - 2]
                    var b = level.points[level.points.length - 1]
                    this.add("entities", new Equipment({
                        position: {
                            x: (a.x + b.x) / 2,
                            y: (a.y + b.y) / 2
                        },
                        level: level.level,
                        type: Math.random() < 0.5 ? "parachute" : "ropes",
                        incline: a.y != b.y ? (a.y < b.y ? +45 : -45) : 0,
                    }))
                }
            }
        }
    }
}
