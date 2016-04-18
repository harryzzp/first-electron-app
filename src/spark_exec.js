var fs = require('fs')
var iconv_lite = require('iconv-lite')

var cp = require('child_process');

var command = 'spark-submit --class org.glsc.FullLog --master local[4] D:\\IdeaProjects\\LogAnalysis\\target\\LogAnalysis-1.0-SNAPSHOT.jar D:\\zzp 28018167'
//exec可以像spawn一样使用

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
    console.log('stdout: ' + buf);
    fs.appendFile("result.log", buf, function (error) {
        if (error) {
            // 出现错误
        }

    });
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
