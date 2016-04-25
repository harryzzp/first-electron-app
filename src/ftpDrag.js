var Client = require('ftp')
var fs = require('fs')

var c = new Client()

c.on('ready', function() {
    
    c.list("zzp/wt", function(err, list) {
        if (err) throw err
        console.dir(list)
        c.end()
    })
    
    
})

c.connect({
    "host": "10.192.0.188",
    "port": 21,
    "user": "admin",
    "password": "888888",
    "connTimeout": 10000,
    "pasvTimeout": 10000,
    "keepalive": 30000
})



