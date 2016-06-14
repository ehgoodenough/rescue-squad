var fs = require("fs")
var path = require("path")
var chalk = require("chalk")
var yargs = require("yargs")
var jsesc = require("jsesc")
var cssesc = require("cssesc")
var rimraf = require("rimraf")
var ansiup = require("ansi_up")
var ngrok = require("ngrok")
var ip = require("internal-ip")

var Webpack = require("webpack")
var WebpackExtract = require("extract-text-webpack-plugin")
var BrowserSync = require("browser-sync")
var Inliner = require("inliner")

var PORT = 4444
var NAME = require("./package.json").name
var PATH = path.join(__dirname, "./source")
var STAGE = yargs.argv.production ? "PRODUCTION" : "DEVELOPMENT"
var MODE = yargs.argv._.indexOf("server") != -1 ? "SERVER" : yargs.argv._.indexOf("bundle") != -1 ? "BUNDLE" : null
var NGROK = yargs.argv.ngrok

var server = null

rimraf("./builds", function() {
    Webpack({
        entry: {
            "index.js": "./source/index.js",
            "index.css": "./source/index.css",
            "index.html": "./source/index.html",
        },
        output: {
            filename: "[name]",
            path: "./builds/web",
        },
        watch: MODE == "SERVER",
        module: {
            preLoaders: [
                //{test:/\.js$/, exclude: /node_modules/, loader: "eslint-loader"},
            ],
            loaders: [
                {test: /\.json$/i, loader: "json-loader"},
                {test: /\.js$/i, exclude: /(node_modules)/i, loader: "babel-loader"},
                {test: /\.s?css$/i, loader: new WebpackExtract("css", "index.css").extract(["css-loader", "autoprefixer-loader", "sass-loader"])},
                {test: /\.html$/i, loader: new WebpackExtract("html", "index.html").extract(["html-loader"])},
                {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-webpack-loader"]},
                {test: /\.(ttf|otf|woff|svg)$/i, loader: "url-loader"},
                {test: /\.(mp3|wav)$/i, loader: "url-loader"},
            ]
        },
        node: {
            fs: "empty", // for Pixi
        },
        plugins: [
            new WebpackExtract("css", "index.css"),
            new WebpackExtract("html", "index.html"),
            new Webpack.DefinePlugin({
                PATH: JSON.stringify(PATH),
                STAGE: JSON.stringify(STAGE),
                PLATFORM: JSON.stringify("DESKTOP"),
                VERSION: JSON.stringify(JSON.parse(fs.readFileSync("./package.json")).version),
            }),
            STAGE == "PRODUCTION" ? new Webpack.optimize.UglifyJsPlugin() : new Webpack.IgnorePlugin(/^$/),
        ]
    }, function(error, results) {
        print("Building" + " " + NAME)
        if(results.compilation.errors.length > 0) {
            var jserrors = [], csserrors = [], htmlerrors = []
            results.compilation.errors.forEach(function(error) {
                console.log(error)
                if(/\.js$/.test(error.module.resource)) {
                    jserrors.push(error.toString())
                } else if(/\.css$/.test(error.module.resource)) {
                    csserrors.push(error.toString())
                } else if(/\.html$/.test(error.module.resource)) {
                    htmlerrors.push(error.toString())
                }
            })
            if(jserrors.length > 0) {
                jserrors.forEach(function(jserror) {console.log(jserror)})
                fs.writeFileSync("./builds/web/index.js", injectviajs(jserrors))
            }
            if(csserrors.length > 0) {
                csserrors.forEach(function(csserror) {console.log(csserror)})
                fs.writeFileSync("./builds/web/index.css", injectviacss(csserrors))
            }
        }
        if(MODE == "SERVER") {
            if(server == null) {
                server = BrowserSync({
                    server: "./builds/web",
                    logLevel: "silent",
                    notify: false,
                    port: PORT
                })
                print("Listening on " + chalk.underline("http://127.0.0.1:4444"))
                print("Listening on " + chalk.underline("http://" + ip.v4() + ":4444"))
                if(NGROK) {
                    ngrok.connect(PORT, function(error, url) {
                        if(error) {
                            console.log(error)
                        } else {
                            print("Listening on " + chalk.underline(url))
                        }
                    })
                }
            } else {
                server.reload()
            }
        } else if(MODE == "BUNDLE") {
            new Inliner("./builds/web/index.html", function(error, data) {
                fs.mkdir("./builds/web1", function() {
                    fs.writeFile("builds/web1/index.html", data)
                })
            })
        }
    })
})


var print = function(message) {
    console.log(time(), message)
}

var time = function() {
    var date = new Date()
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    var seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
    return "[" + chalk.green(hours + ":" + minutes + ":" + seconds) + "]"
}

var injectviajs = function(content) {
    var styles = {
        "color": "#000 !important",
        "padding": "2em !important",
        "font-size": "medium !important",
        "font-style": "normal !important",
        "font-weight": "normal !important",
        "font-variant": "normal !important",
        "font-stretch": "normal !important",
        "font-family": "monospace !important",
        "line-height": "normal !important",
        "white-space": "pre-wrap !important",
        "background-color": "#FFF !important",
    }
    styles = Object.keys(styles).map(function(key) {
        return key + ":" + styles[key] + ";"
    }).join(" ")
    content = content instanceof Array ? content : [content]
    content = content.map(function(message) {
        return "<div>" + ansiup.ansi_to_html(message) + "</div>"
    })
    content = "<div style=\"" + styles + "\">" + content.join("\n") + "</div>"
    content = "document.body.innerHTML=\"" + jsesc(content, {quotes: "double"}) + "\""
    content = "window.addEventListener(\"DOMContentLoaded\", function() {" + content + "})"
    return content
}

var injectviacss = function(content) {
    content = content instanceof Array ? content : [content]
    content = content.join("\n")
    content = "body:before{content:\"" + cssesc(content, {quotes: "double"}) + "\";}"
    content = "body{font-family:monospace;white-space:pre;padding:2em;}" + content
    return content
}

// favicon
// electron
// cordova?
// pull out injection code
