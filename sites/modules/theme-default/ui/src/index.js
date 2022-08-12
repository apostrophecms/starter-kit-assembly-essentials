export default () => {
  console.log('Default theme project level js file');
  // Quick and dirty, http -> ws, https -> wss
  const url = window.location.href.replace(/^http/, 'ws');
  console.log(url);
  const ws = new WebSocket(url);
  ws.onopen = () => {
    ws.send('Hello from the browser side');
  };
  ws.onmessage = m => {
    console.log(`I got back: ${m.data}`);
  };
  ws.onerror = e => {
    console.error(e);
  };
  ws.onclose = e => {
    console.error('closed');
  };
};
