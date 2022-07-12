// 프론트 코드

const socket = new WebSocket(`ws://${window.location.host}`);

// 연결이 됐을때
socket.addEventListener('open', () => {
  console.log('connected to server ⭐️');
});

socket.addEventListener('message', (message) => {
  console.log('got a message📝', message.data);
});

socket.addEventListener('close', () => {
  console.log('Disconnect server❌');
});

setTimeout(() => {
  socket.send('hello from the browser!');
}, 10000);
