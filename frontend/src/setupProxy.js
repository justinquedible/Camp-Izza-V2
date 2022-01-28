const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://sql-api-f36qdjpc6a-wl.a.run.app",
      // target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
