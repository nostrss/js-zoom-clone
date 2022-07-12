// 프론트 코드
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// 연결이 됐을때
socket.addEventListener('open', () => {
  console.log('connected to server ⭐️');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconnect server❌');
});

//메시지 보내는 곳
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');

  socket.send(makeMessage('new_message', input.value));
  input.value = '';
}

// 닉네임 보내는 곳
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
