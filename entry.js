// 定义全局变量
global.rootPath = __dirname;

// 依赖模块
import express from "express";
import body_parse from "body-parser";
import path from "path";
import routers from "./router/routers";

const app = express();

//加载环境变量
app.use(body_parse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/static")));

//路由
routers(app);

//监听端口
app.listen(8888);
