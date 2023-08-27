const express = require("express");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const REMOTE_API_URL = process.env.REMOTE_API_URL || "";
const LOCAL_API_PREFIX = process.env.LOCAL_API_PREFIX || "";
const LOCAL_SERVER_DIRECTORY = process.env.LOCAL_SERVER_DIRECTORY || "public";

// Use the compression middleware before any route or static serving.
app.use(compression());

// Serve static files from the 'public' directory
app.use(express.static(LOCAL_SERVER_DIRECTORY));

// Proxy any requests to /api to the remote server
if (!!REMOTE_API_URL && !!LOCAL_API_PREFIX) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: REMOTE_API_URL,
      changeOrigin: true, // required for virtual hosted sites
      pathRewrite: {
        [`^${LOCAL_API_PREFIX}`]: "", // remove base path
      },
    })
  );
} else {
  console.log("no proxy");
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}, serving local directory ${LOCAL_SERVER_DIRECTORY} and forwarding requests to ${REMOTE_API_URL}`);
});
