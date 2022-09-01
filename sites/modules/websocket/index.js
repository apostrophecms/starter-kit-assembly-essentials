module.exports = {
  methods(self) {
    return {
      connected(ws, req) {
        ws.on('message', m => {
          console.log(`message received: ${m}`);
          ws.send('I am the websocket server and now I will close the connection');
          ws.close();
        });
        ws.on('close', () => {
          console.log('websocket closed');
        });
      }
    };
  }
};
