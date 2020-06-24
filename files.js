var fs = require('fs');
var path = require('path');
let times = {
  1: '2020-6-3 16:30:27',
  2: '2020-6-5 22:49:01',
  3: '2020-6-6 23:09:38',
  4: '2020-6-7 19:51:39',
  5: '2020-6-10 18:25:51',
  6: '2020-6-12 18:24:41',
  7: '2020-6-14 21:35:35',
  作业: '2020-6-15 11:28:49',
};
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
function changeTime(filePath) {
  // console.log(times[filePath.split('\\')[1]]);
  var time = times[filePath.split('\\')[1]];
  time = RandomNumBoth(
    new Date(time).getTime(),
    new Date(time).getTime() - 24 * 60 * 60 * 1000
  );
  fs.utimes(
    filePath,
    new Date('2020.5.31 17:22:31'),
    new Date('2020.5.31 17:22:31'),
    function (err) {
      if (err) {
        throw err;
      }
      console.log('time update');
    }
  );
}

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('E:');

//调用文件遍历方法
fileDisplay('./floder/');

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            changeTime(filedir);
            if (isFile) {
              console.log(filedir);
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}
