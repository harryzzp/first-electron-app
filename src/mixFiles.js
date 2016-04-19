var fs = require('fs')
var totalText;
var srcFile;

// for (var i=1; i<=6; i++) {
//     var fileName = 'D:\\logss\\wt001\\guolian.log.'+i;
//     console.log(fileName)
//     var text = fs.readFileSync(fileName);
//     fs.appendFileSync('D:\\total.log', text)
// }

for (var i=0; i<=500; i++) {
    var fileName
    if (i==0) {
       fileName  = 'D:\\logss\\newwt\\guolian.log';
    } else {
       fileName  = 'D:\\logss\\newwt\\guolian.log.'+i;
    }
    
    console.log(fileName)
    var text = fs.readFileSync(fileName);
    fs.appendFileSync('D:\\3g.log', text)
}
