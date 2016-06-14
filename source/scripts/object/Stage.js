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

        this.add("player", false, new Player({
            position: {
                x: 3 * UNIT,
                y: 0.5 * UNIT,
            },
            width: 0.5 * UNIT,
            height: 0.5 * UNIT,
            inputs: {
                "up": new Input(["W", "<up>"]),
                "down": new Input(["S", "<down>"]),
                "left": new Input(["A", "<left>"]),
                "right": new Input(["D", "<right>"]),
            },
            color: "#FFF",
        }))

        for(var levelnum = 0; levelnum < 3; levelnum += 1) {
            this.add("levels", levelnum, new Level({
                color: stage.colors[levelnum + 1],
                levelnum: levelnum,
            }))
        }

        this.dogs = stage.dogs || 99
        this.colors = stage.colors || []
        this.stagenum = stage.stagenum || 1

        this.entityCountdown = 0
        this.timerToNextStage = 3
    }
    update(delta) {
        if(this.mode == "complete"
        || this.mode == "game over"
        || this.mode == "lost a beagle") {
            this.timerToNextStage -= delta / 1000
            if(this.timerToNextStage <= 0
            || Input.isJustDown("<space>", delta)) {
                this.game.stage = new Stage(this.game, {
                    stagenum: this.stagenum + (this.mode == "complete" ? 1 : 0),
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

            this.entityCountdown -= delta / 1000
            if(this.entityCountdown <= 0) {
                this.entityCountdown = 5
                var level = this.levels[Math.floor(Math.random() * this.levels.length)]
                if(Math.random() < 0.5) {
                    this.add("entities", undefined, new Beagle({
                        position: {
                            x: level.points[level.points.length - 1].x,
                            y: level.points[level.points.length - 1].y,
                        },
                        levelnum: level.levelnum,
                    }))
                } else {
                    var a = level.points[level.points.length - 2]
                    var b = level.points[level.points.length - 1]
                    this.add("entities", undefined, new Equipment({
                        position: {
                            x: (a.x + b.x) / 2,
                            y: (a.y + b.y) / 2
                        },
                        levelnum: level.levelnum,
                        type: Math.random() < 0.5 ? "parachute" : "ropes",
                        incline: a.y != b.y ? (a.y < b.y ? +45 : -45) : 0,
                    }))
                }
            }
        }
    }
    add(bucket, key, object) {
        if(key == undefined) {
            key = ShortID.generate()
        }

        object.key = key
        object.stage = this
        object.game = this.game
        
        if(key === false) {
            this[bucket] = object
        } else {
            this[bucket] = this[bucket] || new Object()
            this[bucket][object.key] = object
            this[bucket].length = (this[bucket].length || 0) + 1
        }
    }
    remove(bucket, object) {
        delete this[bucket][object.key]
        this[bucket].length -= 1
    }
}
