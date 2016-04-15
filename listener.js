var http = require('http')
var url = require('url')

function start() {
    console.log('call the start')
    function onRequest(request, response) {
        console.log('call the onRequest function')
        response.writeHead(200, {'Content-type':"text/plain"})
        response.write('aa')
        response.end()
    }
    http.createServer(onRequest).listen(80)
    console.log('Server has started')
    alert('listener started...')
}

exports.start = start
