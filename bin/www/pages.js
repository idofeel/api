// 加载依赖
import fs from "fs";

export default {
  index(req, res, next) {
    fs.readFile(`${rootPath}/views/index.html`, (err, data) => {
      res.send(data.toString());
    });
  },
  player(req, res, next) {
    res.send("hello1");
  }
};
