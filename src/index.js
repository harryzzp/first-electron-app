// document.getElementById('button').addEventListener('click', function(){
//   alert("It's me");
// })

var remote = require('remote');
var dialog = remote.require('dialog')
var fs = require('fs');
var iconv_lite = require('iconv-lite')

window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js')

var call_spark = require('./spark_exec.js')

$(function() {
  $('#button').click(function() {
    alert('start');
    call_spark.callSpark()
    alert("It's me")
  })

  $('#chooseFile').click(function() {
    dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile'],
      filters: [{
        name: 'Text',
        extensions: ['txt', 'xml']
      }],
    }, function(fileNames) {
      if(fileNames) {
        var text = fs.readFileSync(fileNames[0]);
        //对GBK编码进行转换
        str = iconv_lite.decode(text, 'gbk');
        buf = iconv_lite.encode(str, 'utf8');
        $('#output').text(buf);
      }
    })
  })
})

angular.module('first-electron-app', [])
.controller('DemoCtrl', function($scope) {
})
