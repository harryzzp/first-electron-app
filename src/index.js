// document.getElementById('button').addEventListener('click', function(){
//   alert("It's me");
// })

var remote = require('remote')
var dialog = remote.require('dialog')
var fs = require('fs')
var iconv_lite = require('iconv-lite')
var cp = require('child_process')
var path = require('path')

var demo_text_path = '';

window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js')

$(function () {
  $('#log_button').click(function () {
    var log_dir = $('#log_dir').val().trim();
    if (log_dir == '') {
      alert('请输入日志路径！');
      return;
    }
    var master = $('#master').val().trim();
    if (master == '') {
      alert('请设置spark.master！');
      return;
    }
    var driver_memory = $('#driver_memory').val().trim();
    if (driver_memory == '') {
      alert('请分配内存！');
      return;
    }
    var serializer = $('#spark_serializer').val().trim();
    if (serializer == '') {
      alert('请输入spark.serializer！');
      return;
    }
    var search_text = $('#search_text').val().trim();
    if (search_text == '') {
      alert('请输入要搜索的内容！');
      return;
    }
    if (!fs.existsSync('D:\\temp\\')) {
      fs.mkdirSync('D:\\temp\\');
    }
    var tempFile = 'D:\\temp\\' + (new Date().getFullYear() + '.log');

    if (fs.existsSync(tempFile)) {
      alert('del ' + tempFile)
      fs.unlinkSync(tempFile);
    }

    if (!fs.existsSync(log_dir)) {
      alert('日志目录' + log_dir + '不存在！');
      return;
    }

    fs.readdirSync(log_dir).forEach((fileName) => {
      var file = path.join(log_dir, fileName)
      var text = fs.readFileSync(file);
      fs.appendFileSync(tempFile, text);
    });

    var command = 'spark-submit --class org.glsc.FullLog --master '
      + master + ' --driver-memory ' + driver_memory + ' '
      + '--conf spark.eventLog.enabled=false '
      + '--conf spark.serializer=org.apache.spark.serializer.KryoSerializer '
      + '--conf spark.executor.extraJavaOptions="-XX:+PrintGC -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:-UseGCOverheadLimit -XX:CMSInitiatingOccupancyFraction=10" '
      + 'D:\\IdeaProjects\\LogAnalysis\\target\\LogAnalysis-1.0-SNAPSHOT.jar '
      + '"' + tempFile + '" "' + search_text + '"';

    alert("即将执行：" + command)

    var ls = cp.exec(command, {
      encoding: 'utf8',
      timeout: 0,
      maxBuffer: 20000 * 1024,
      killSignal: 'SIGTERM',
      cwd: null,
      env: null
    });

    ls.stdout.on('data', function (data) {
      if (data.indexOf(search_text) != -1) {
        // str = iconv_lite.decode(data, 'gbk');
        // buf = iconv_lite.encode(str, 'utf8');
        $('#log_output').append('<p>' + data + '</p>');
        fs.appendFile("result.log", data, function (error) {
          if (error) {
            // 出现错误
            $('#log_output').append('<p>' + data + '</p>');
          }
        });
      }
    });

    ls.stderr.on('data', function (data) {
      $('#log_output').append('<p>' + data + '</p>');
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
