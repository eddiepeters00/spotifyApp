const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3004", //SERVER PORT
      changeOrigin: true,
    })
  );
};
