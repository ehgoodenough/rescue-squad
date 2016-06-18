import Level from "./Level.js"
import Player from "./Player.js"
import {Beagle, Equipment, Scientist} from "./Entity.js"

import {UNIT} from "../utility/Data.js"
import Input from "../utility/Input.js"
import {getMidpoint} from "../utility/Geometry.js"

import ShortID from "shortid"

export default class Stage {
    constructor(game, protostage) {
        this.game = game

        this.entities = new Object()

        this.add("player", false, new Player({
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
                color: protostage.colors[levelnum + 1],
                levelnum: levelnum,
            }))
        }

        this.rescues = protostage.rescues || 99
        this.colors = protostage.colors || []
        this.stagenum = protostage.stagenum || 0
        this.spawnqueue = [
            {class: Beagle, timer: 0, maxtimer: 6},
            {class: Equipment, timer: 0, maxtimer: 10, types: ["parachute", "rope"]},
            {class: Scientist, timer: 0, maxtimer: 10, types: ["blob", "biohazdude"]}
        ]

        this.entityCountdown = 0
        this.timerToNextStage = 3
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
                    this.game.continues -= 1
                    if(this.game.continues > 0) {
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
               this.game.restart()
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
                        type: !!spawn.types ? spawn.types[Math.floor(Math.random() * spawn.types.length)] : undefined
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
            rescues: this.rescues,
        }
    }
}
