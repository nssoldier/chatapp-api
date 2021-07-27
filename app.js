require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require('http');
const SocketIO = require("socket.io")

const PORT = process.env.PORT || 3000;

const authenMiddlewares = require("./account/services/authen.middlewares");

const app = express();
const server = http.Server(app);

(async () => {
  await mongoose.connect("mongodb+srv://chat-app:an12101999@cluster0.ifnzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Api is running");
  });
  app.use(authenMiddlewares.verify);

  require("./account")(app);
  require("./message")(app);
  // app.use(authenMiddlewares.verify);

  server.listen(PORT, function (err) {
    if (err) throw err
    console.log('Listening on port %d', PORT);
  });
  require("./socket");

  // const io = SocketIO(server);
  // io.on("connection", socket => {
  //   console.log('client connect...', socket.id);
  //   socket.on("room", async room => {
  //     try {
  //       socket.join(room);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  //   socket.on("message", data => {
  //     try {
  //       io.emit("message", data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  // });
})();

module.exports = { server };