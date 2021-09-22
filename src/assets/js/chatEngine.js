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
    this.socket.on('connect', function () {
      console.log('connection established with backend');
    });
  }
}
