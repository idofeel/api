/**
 * 提供路由跳转执行的方法
 */
import fs from "fs";
import qs from "querystring";
import qqMusic from "../../services/qqMusic";
import url from "url";
import { Word, ddd } from "../../services/httpAPI";
// console.log(global.process.env.PWD);

export default {
  index(req, res, next) {
    fs.readFile(`${rootPath}/views/index.html`, (err, data) => {
      res.send(data.toString());
    });
  },
  player(req, res, next) {
    qqMusic.searchMusic("周杰伦", res);
  },
  translate(req, res, next) {
    // 获取单词
    let word = req.method == "GET" ? req.query.word : req.body.word;
    // 请求接口
    Word.translate(word, (err, msg) => {
      // 返回数据
      res.send(err || !msg ? "没找到记录" : msg);
    });
  }
};
