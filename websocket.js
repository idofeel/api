var ws = require('nodejs-websocket');

function loadFile({ percenting }) {
  const fs = require('fs');
  const path = require('path');
  const src = path.join(__dirname, './services/GoogleDownload.zip');

  // 根据指定的文件创建一个可读流，得到一个可读流对象
  let readStream = fs.createReadStream(src);

  let totalSize = fs.statSync(src).size; // 通过 fs.statSync 获取文件大小
  let curSize = 0;
  let percent = '0%';

  // 流对象有一个 data 事件，流对象会自动的帮我们去读取文件中的数据
  // 一点一点的读，只要读到了一点数据，就触发 data 事件，将该数据传递给 data 事件的回调函数
  readStream.on('data', (chunk) => {
    // chunk 数据块
    // 计算当前读取到的文件的大小，计算读取的顺序
    // chunk 是一个 buffer 对象
    // 每一次读取到了一点数据，将该数据的长度累加起来 / 文件的总大小 * 100 得到百分比
    curSize += chunk.length;
    // 将已经读取到的字节数 / 总字节数 * 100 = 百分比
    percent = ((curSize / totalSize) * 100).toFixed(2) + '%';
    percenting && percenting(percent);
    console.log('读取中' + percent);
  });

  // end 事件监听读写结束
  readStream.on('end', () => {
    console.log('读取结束');
  });
}
let testNum = 0;
let tiemr = null;
// Scream server example: "hi" -> "HI!!!"
try {
  var server = ws
    .createServer(function (conn) {
      console.log('New connection');
      conn.on('text', function (str) {
        console.log('Received ' + str);
        //   conn.sendText(str.toUpperCase() + '测试websocket!!!');
        if (!tiemr) {
          tiemr = true;
          loadFile({
            percenting: (percent) => {
              conn.sendText(percent);
            },
          });
        }
      });

      conn.on('close', function (code, reason) {
        console.log('se Connection closed');
        testNum = 0;
      });
      conn.on('error', function (code, reason) {
        try {
          clearInterval(tiemr);
          tiemr = null;
          conn.close();
        } catch (error) {
          console.log('close异常', error);
        }
        // console.log('异常关闭', code);
      });
    })
    .listen(8001);
} catch (error) {}
