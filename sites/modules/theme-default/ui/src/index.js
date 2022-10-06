export default () => {
  console.log('Default theme project level js file');
  // Uncomment to demonstrate a websocket connection
  // // Simple test that works locally and in the cloud: http -> ws, https -> wss
  // const url = window.location.href.replace(/^http/, 'ws');
  // const ws = new WebSocket(url);
  // ws.onopen = () => {
  //   ws.send('message from websocket client');
  // };
  // ws.onmessage = m => {
  //   console.log(`websocket server said: ${m.data}`);
  // };
  // ws.onerror = e => {
  //   console.error(e);
  // };
  // ws.onclose = e => {
  //   console.error('websocket closed');
  // };
};
