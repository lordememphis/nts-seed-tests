const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalisePort = portValue => {
  const port = parseInt(portValue, 10);

  if (isNaN(port)) return portValue;

  if (port >= 0) return port;
  
  return false;
};

const error = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const listening = () => {
  const address = server.address();
  const bind = typeof port === "string" ? "pipe " + address : "port " + port;
  debug("Listening on " + bind);
};

const port = normalisePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", error);
server.on("listening", listening);
server.listen(port);
