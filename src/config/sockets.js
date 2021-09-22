const socket = function (socketServer) {
  let io = require('socket.io')(socketServer, {
    /* https://socket.io/docs/v4/handling-cors/ */
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.sockets.on('connection', function (socket) {
    console.log('new socket connection received', socket.id);

    /* disconnect function done inside connection because we need the socket connected to disconnect it*/
    socket.on('disconnect', function () {
      console.log('socket disconnected', socket.id);
    });

    socket.on('join_room', function (data) {
      console.log('joining request received ', data);
      /* https://socket.io/docs/v4/server-socket-instance/#socketrooms */
      socket.join(data.chatroom);
      /* https://socket.io/docs/v4/rooms/#joining-and-leaving */
      io.in(data.chatroom).emit('user_joined', data);
    });

    socket.on('send_message', function (data) {
      //   console.log('new message');
      io.in(data.chatroom).emit('new_message', data);
    });
  });
};
module.exports = { socket };
