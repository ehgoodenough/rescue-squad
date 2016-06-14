var ShortID = require("shortid")

var players = new Array()
for(var i = 0; i < 30; i++) {
    players.push({
        id: ShortID.generate()
    })
}

var MINUTE = 60000
var MONTH = 43800 * MINUTE

var datapoints = new Array()
for(var index = 0; index < 2; index += 1) {
    var date = Date.now() - Math.floor(Math.random() * (MONTH * 2))
    var random = Math.random()
    var player = players[(index + (random < 1/3 ? +1 : (random < 2/3 ? -1 : 0))) % players.length]
    player.session = player.session || ShortID.generate()
    player.session = Math.random() < 0.5 ? player.session : ShortID.generate()
    datapoints.push({
        player: player.id,
        session: player.session,
        game: ShortID.generate(),
        startTime: date,
        endTime: date + Math.floor((Math.random() * MINUTE * 7) + (MINUTE * 3)),
        didFinishGame: Math.random() > 0.1,
        lastLevel: Math.floor((Math.random() * 7) + 1),
    })
}

for(var index in datapoints) {
    datapoints[index] = {
        "appendCells": {
            "sheetId": 0,
            "fields": "*",
            "rows": [
                {
                    "values": [
                        {"userEnteredValue": {"stringValue": datapoints[index].player}},
                        {"userEnteredValue": {"stringValue": datapoints[index].session}},
                        {"userEnteredValue": {"stringValue": datapoints[index].game}},
                        {"userEnteredValue": {"numberValue": datapoints[index].startTime}},
                        {"userEnteredValue": {"numberValue": datapoints[index].endTime}},
                        {"userEnteredValue": {"numberValue": datapoints[index].lastLevel}},
                        {"userEnteredValue": {"boolValue": datapoints[index].didFinishGame}},
                    ]
                }
            ],
        }
    }
}

// what version? what browser? what platform?

var Google = require("googleapis")
var key = {
  "type": "service_account",
  "project_id": "swing-dance",
  "private_key_id": "04fe06fb9e1ac471b399f97de46a2463660116d7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJO7V7gXh66gIp\nJp1eSaTKo2GmnozdxzBhkn3Drxecihe8DLJrote4DJlr8tqvkIzJp8HgOjhtAcSy\nDUYaSHTc9xP1rD/xUYlak/VvlOoKGxFAdBwAOevI0u1hoE2zF0bCX1+RNGlyO9OA\nBpsC5RQx29p7zQVcsMtHAoo2VWY6Wpl+IP6pIaae5ztz43qo1gGbGpmP2iMLU80i\nJ1PD4PfOqlQEcohzi7RppS8as8b/zQVetK334v1t6EaUYe6ETRfrMnMa2D6y7+Sj\nYLu82gtLVz4516lRXsLuCZ+yfaACYMhTRkrZJfxuYEeiag0htempYgFkLIo1+3MK\nc8Php1TtAgMBAAECggEAOywSjnGgwsvivMT9C0eubGOkiEEg/OnggSB5WLw4vjAh\nEIvPPzVQJ2+VAZgU1AE2VOm+abfU9cDKXOzoSzw5GOyScvAmkUg/kmHljt0EANq6\ntPAvd6WQfqn/YXCoyFu0090FlgYKZ6vN4lyO4kgIKy0RzsuXowzdiVDm4Vk1STzq\n5dTjyRZHr1rbCjnBZDmoUksPXt6FC69ufLeOwUzEvJWAJl0yJJsCEUJSvqooDPlm\nRCPv4gyeC8n/tF24Yg5MCgngh9GBVeaRshK7QcaWvTtWPMvXIUWQZ0j5i8Nm9xeP\nMM+kE0PEPXO2kwip/Rpzo0ifTn5VVYXd3fdioZmwZQKBgQD3ABAX83316NaRM1tK\n4BtmFC9kVDGxJXGtnLAVwKUn+rv+9woXnxR5RUL7kNBwp7cZMj2YpSvoXBW8+Ps/\nF1tcfkQF5GC6RuQjI84cvt5XUmBrYfFkCklj/oDHVbn9+LmREwk8vQNUHa8pz8Tz\n8D18EUD3rKjRXkKjEG0HSZcuawKBgQDQkL8WvtuX3+PP85sYXUJPzsSbxli6PbZP\nPHtT1ym33yqQ/hYxA+bSnlBtT9L2LY6RCW6YKNLKucz3Asy85hLtmHOX31XTk8e+\n/gvILgH3YQSzCgh3FCSBgNGlFrsD3o1f0OR6Pp+P7ChXiGV0Fj7HL70AASq/J5IV\ncSffc7MwBwKBgDpXkXWW1hHXxZbWgqHU/aPG8MrJ+FLXfVp8wDrjHh+rYex/farG\nsJdUfNXfBt0VQHJ7I4GCwjRIS/ou9WmZosLeMEMUBqT5SbnjIzQ3AV2u34d9wv7W\nTy+HVfO/lAchUPOrg2sNWlPsDwvZP7Q+8sbzbF0UM2wAz8ykfJxUDZmxAoGBAIX1\n0qbbY9RC2+I/h8i4bdUw65taZLcK2ERAhr4tHwCY+JA0gzBsXx+8y8/KS6gPTtjd\nhAl7fxjzCjFFvRc/d7zgBK7xpgDFlLCaIBstYdnwmMIemZ1SdLgxc3ZkCS7NDWUT\nmQzjmD0q5CaE1xUfDKeHhA+ysDAjTHM1QPUHLXqVAoGAC3t3OUICSpJ63AXMWBqu\nbJB3+x+RI0zGri/zzM+2M9Mh6lZjTesEwOW4Bq7E07ZQz7ArD+zB8R64BaW0SwEX\nyQBGH04JtsazI3pmm6Hwz5RSmkE036Bc+nlrnQ+9jBdZluM5GbQF1zI6jAzs5Ps4\nmpNGtb1sFATBF2jnlxfqpXg=\n-----END PRIVATE KEY-----\n",
  "client_email": "driven@swing-dance.iam.gserviceaccount.com",
  "client_id": "101431629204708533922",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/driven%40swing-dance.iam.gserviceaccount.com"
}

var jwt = new Google.auth.JWT(key.client_email, null, key.private_key, [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/spreadsheets.readonly"
], null)

jwt.authorize(function(error, tokens) {
    if(error) {
        throw error
    }

    var Sheets = Google.sheets({version: "v4", auth: jwt})
    Sheets.spreadsheets.batchUpdate({
        spreadsheetId: "1DcZ14-SBOGo3OZvj8qrgHS9upB5v6T7XxNYLfGnkg2A",
        resource: {requests: datapoints}
    }, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log(response)
        }
    })
})

return

// requires: <script src="https://apis.google.com/js/client.js" type="text/javascript"></script>

window.setTimeout(function() {
    var Google = window.gapi
    console.log("google api loaded")
    Google.client.setApiKey("AIzaSyAKsk7K3Do7gd7qkPsc1-NNYDeJdmxb2Ss")
    Google.auth.authorize({
        client_id: "606610193463-er5b0btg211fmuh98njteqlsbu61p7c6.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/spreadsheets",
        //immediate: true
    }, function(result) {
        console.log("google api authenticated")
        Google.client.load("sheets", "v4").then(function() {
            console.log("google sheets api loaded")
            Google.client.sheets.spreadsheets.values.get({
                spreadsheetId: "1DcZ14-SBOGo3OZvj8qrgHS9upB5v6T7XxNYLfGnkg2A",
                range: "Data!A2:H2",
            }).then((response) => {
                console.log(response.result)
            }, (error) => {
                console.log(error.result.error)
            })
        })
    })
    // Google.client.load("urlshortener", "v1").then(() => {
    //     Google.client.urlshortener.url.get({
    //         "shortUrl": "http://goo.gl/fbsS"
    //     }).then((response) => {
    //         console.log(response.result)
    //     }, (error) => {
    //         console.log(error.result.error)
    //     })
    // })
    // Google.client.load("sheets", "v4").then(function() {
    //     console.log(Google.client.sheets.spreadsheets)
    //     Google.client.sheets.spreadsheets.values.get({
    //         spreadsheetId: "1DcZ14-SBOGo3OZvj8qrgHS9upB5v6T7XxNYLfGnkg2A",
    //         range: "Data!A2:H2",
    //     }).then((response) => {
    //         console.log(response.result)
    //     }, (error) => {
    //         console.log(error.result.error)
    //     })
    // })
}, 1000)
