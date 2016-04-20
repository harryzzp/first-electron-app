var fs = require('fs')
var path = require('path');

var start = new Date().getTime();
var logDir = path.join('D:\\logss\\wt001\\');

// fs.exists(logDir, (exists) => {
//     if (!exists) {
//         console.log('Log directory [%s] does not exist.', logDir);
//     } else {
//         fs.readdirSync(logDir).forEach((fileName) => {
//             var file = path.join(logDir, fileName)
//             var text = fs.readFileSync(file);
//             fs.appendFileSync('D:\\ccc.log', text);
//             console.log(file);
//         });
//     }
// })

// var end = new Date().getTime()
// console.log('Took %d ms.', (end - start));
