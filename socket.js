const SocketIO = require("socket.io");
const { server } = require('./app');

const io = SocketIO(server);
io.on("connection", socket => {
  console.log('client connect...', socket.id);
  socket.on("room", async room => {
    try {
      socket.join(room);
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("message", data => {
    try {
      io.emit("message", data);
    } catch (err) {
      console.error(err);
    }
  });
});

module.exports = {
  emitToRoom: async (room, eventName, data) => {
    io.to(room).emit(eventName, data);
  },
  broadcast: async (eventName, data) => {
    io.emit(eventName, data);
  }
}