// 配置路由及请求接口
import pages from "../bin/www/pages";
let Router = app => {
  const routers = [
    { path: "/", type: "get", method: pages.index },
    { path: "/player", type: "get", method: pages.player }
  ];

  routers.forEach(r => {
    app[r.type](r.path, r.method);
  });
};

//
export default Router;
