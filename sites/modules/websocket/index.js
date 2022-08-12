module.exports = {
  methods(self) {
    return {
      connected(ws, req) {
        ws.on('message', m => {
          self.apos.util.log(`message received: ${m}`);
          ws.send('I must\'ve called a thousand times');
          ws.close();
        });
        ws.on('close', () => {
          console.log('closed');
        });
      }
    };
  }
};
