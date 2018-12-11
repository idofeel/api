// 配置路由及请求接口
import pages from "../bin/www/pages";

export default app => {
  const routers = [
    { path: "/", type: "get", method: pages.index },
    { path: "/player", type: "get", method: pages.player },
    { path: "/translate", type: "all", method: pages.translate }
  ];
  // 调用路由
  routers.forEach(r => {
    app[r.type](r.path, r.method);
  });
};
