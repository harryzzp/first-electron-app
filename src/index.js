(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js')
var fs = require('fs')
$(function () {
    $('#button_game').click(function () {
        window.location.href = "game.html"
    })
    $('#button_stock').click(function () {
        window.location.href = "stock.html"
    })
    $('#button_note').click(function () {
        var text = $('#text_note').val()
        fs.writeFileSync('message.txt',
            text, 'utf8');
    })

})


