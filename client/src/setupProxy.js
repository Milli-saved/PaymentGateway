const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("************************************************");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cbebirrpaymentgateway.cbe.com.et:8888/",
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Content-Type"] = "application/json";
      },
    })
  );
};
