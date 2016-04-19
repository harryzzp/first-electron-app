// document.getElementById('button').addEventListener('click', function(){
//   alert("It's me");
// })

var remote = require('remote');
var dialog = remote.require('dialog')
var fs = require('fs');
var iconv_lite = require('iconv-lite')
var cp = require('child_process');

var demo_text_path = ''

window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js')

$(function () {
  $('#button').click(function () {
    var master = $('#master').val()
    var driver_memory = $('#driver_memory').val()
    var serializer = $('#serializer').val()
    var file_path = $('#file_path').val()
    var search_text = $('#search_text').val()
    var command = 'spark-submit --class org.glsc.FullLog --master '
      + num_of_cores + ' D:\\IdeaProjects\\LogAnalysis\\target\\LogAnalysis-1.0-SNAPSHOT.jar '
      + file_path + ' ' + search_text

    alert(command)

    var ls = cp.exec(command, {
      encoding: 'gbk',
      timeout: 0,
      maxBuffer: 20000 * 1024,
      killSignal: 'SIGTERM',
      cwd: null,
      env: null
    });

    ls.stdout.on('data', function (data) {
      str = iconv_lite.decode(data, 'gbk');
      buf = iconv_lite.encode(str, 'utf8');
      // console.log('stdout: ' + buf);
      // $('#log_output').text(buf);
      $('#log_output').append('<p>' + buf + '</p>');
      fs.appendFile("result.log", buf, function (error) {
        if (error) {
          // 出现错误
        }

      });
    });

    ls.stderr.on('data', function (data) {
      // console.log('stderr: ' + data);
    });

    ls.on('exit', function (code) {
      alert('运行结束！')
      console.log('child process exited with code ' + code);
    });

  })
  
  $('#chooseFile').click(function () {
    dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile'],
      filters: [{
        name: 'Text',
        extensions: ['txt', 'xml', 'log']
      }],
    }, function (fileNames) {
      if (fileNames) {
        var text = fs.readFileSync(fileNames[0]);
        // $('#output').text(text);
        //对编码进行转换
        str = iconv_lite.decode(text, $('#encoding_list option:selected').val());
        buf = iconv_lite.encode(str, 'utf8');
        $('#output').text(buf);
        demo_text_path = fileNames;
      }
    })
  })
  
})

function changeEncoding(sel) {
  
    if (demo_text_path != '') {
        var text = fs.readFileSync(demo_text_path[0]);
        // $('#output').text(text);
        //对编码进行转换
        str = iconv_lite.decode(text, sel.value);
        buf = iconv_lite.encode(str, 'utf8');
        $('#output').text('');
        $('#output').text(buf);
    }

    }

angular.module('first-electron-app', [])
  .controller('ctrl', function ($scope) {
  })
