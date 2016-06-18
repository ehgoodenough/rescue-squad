import Level from "./Level.js"
import Player from "./Player.js"
import {Beagle, Equipment, Scientist} from "./Entity.js"

import {UNIT} from "../utility/Data.js"
import Input from "../utility/Input.js"
import {getMidpoint} from "../utility/Geometry.js"

import ShortID from "shortid"

export default class Stage {
    constructor(game, stage) {
        this.game = game

        this.entities = new Object()

        this.add("player", false, new Player({
            position: {
                x: 3.5 * UNIT,
                y: 0.5 * UNIT,
            },
            width: 0.5 * UNIT,
            height: 0.5 * UNIT,
            inputs: {
                upwards: new Input(["W", "<up>"]),
                downwards: new Input(["S", "<down>"]),
                leftwards: new Input(["A", "<left>"]),
                rightwards: new Input(["D", "<right>"]),
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
        this.stagenum = stage.stagenum || 0

        this.entityCountdown = 0
        this.timerToNextStage = 3

        this.spawnqueue = [
            {class: Beagle, timer: 0, maxtimer: 6},
            {class: Equipment, timer: 0, maxtimer: 10},
            {class: Scientist, timer: 0, maxtimer: 10}
        ]
    }
    update(delta) {
        if(this.mode == "complete"
        || this.mode == "died"
        || this.mode == "lost a beagle") {
            this.timerToNextStage -= delta / 1000
            if(this.timerToNextStage <= 0
            || Input.isJustDown("<space>", delta)) {
                if(this.mode == "complete") {
                    this.game.startStage()
                } else if(["lost a beagle", "died"].indexOf(this.mode) != -1) {
                    this.game.lives -= 1
                    if(this.game.lives > 0) {
                        this.game.startStage(this.toData())
                    } else {
                        this.mode = "game over"
                        this.timerToNextStage = 3
                    }
                }
            }
        } else if(this.mode == "game over") {
            this.timerToNextStage -= delta / 1000
            if(this.timerToNextStage <= 0
            || Input.isJustDown("<space>", delta)) {
               this.game.state.newGame()
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

            this.spawnqueue.forEach((spawn) => {
                spawn.timer -= delta / 1000
                if(spawn.timer <= 0) {
                    spawn.timer = spawn.maxtimer // make random within range
                    var level = this.levels[Math.floor(Math.random() * this.levels.length)]
                    var midpoint = getMidpoint(level.points[level.points.length - 1], level.points[level.points.length - 2])
                    this.add("entities", undefined, new spawn.class({
                        position: midpoint,
                        levelnum: level.levelnum,
                        type: Math.random() < 0.5 ? "parachute" : "ropes", // make this generic for all spawntypes
                    }))
                }
            })
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
    toData() {
        return {
            stagenum: this.stagenum,
            colors: this.colors,
            dogs: this.dogs,
        }
    }
}
