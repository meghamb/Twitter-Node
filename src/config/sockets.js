const socket = function (socketServer) {
  let io = require('socket.io')(socketServer, {
    /* https://socket.io/docs/v4/handling-cors/ */
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.sockets.on('connection', function (socket) {
    console.log('new socket connection recieved', socket.id);
    /* disconnect function done inside connection because we need the socket connected to disconnect it*/
    socket.on('disconnect', function () {
      console.log('socket disconnected', socket.id);
    });
  });
};
module.exports = { socket };
