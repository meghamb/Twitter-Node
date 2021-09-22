/* frontend rendered in browser logic here */
console.log('chatengine on');
/*  now jquery and socket are available in this file because of cdn imports in home.ejs file */
class ChatEngine {
  constructor(chatBox, userEmail) {
    this.chatBox = $(`#${chatBox}`);
    this.userEmail = userEmail;
    this.socket = io.connect('http://localhost:3001');
    if (this.userEmail) {
      this.connectHandler();
    }
  }
  connectHandler() {
    let self = this;
    this.socket.on('connect', function () {
      console.log('connection established with backend');
      /* adding room concept */
      self.socket.emit('join_room', {
        userEmail: self.userEmail,
        chatRoom: 'twitter',
      });

      self.socket.on('user_joined', function (data) {
        console.log('new user in the room', data);
      });

      self.socket.on('new_message', function (data) {
        console.log('Message Data', data);
        let newMessage = $('<li>');
        let messageType = 'others-message';
        if (data.userEmail == self.userEmail) {
          messageType = 'own-message';
        }
        let span = $('<span>').text(data.userEmail);
        let p = $('<p>').text(data.message);
        newMessage.append(span);
        newMessage.append(p);
        newMessage.addClass(messageType);
        $('#message-list').append(newMessage);
      });

      $('#send-message').click(function () {
        let message = $('#message-input').val();
        if (message != '') {
          self.socket.emit('send_message', {
            message: message,
            userEmail: self.userEmail,
            chatRoom: 'twitter',
          });
        }
        $('#message-input').val('');
      });
    });
  }
}
