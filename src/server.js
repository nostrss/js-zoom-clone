import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));

// 어떤 경로로 접근 하던지 '/' 으로 이동시킨다
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () =>
  console.log(`hello👻 Listening on http://localhost:3000`);

// http와 ws 서버 2개가 꼭 다 있을 필요는 없다
// http 서버만들기
const server = http.createServer(app);

// webSocket 서버만들기
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
  console.log(socket);
  socket.send('hello');
}

wss.on('connection', (socket) => {
  // 브라우저와 서버가 연결됐을 때
  console.log('Connected to Browser✅');

  // 브라우저가 꺼졌을때, 연결이 끊겼을때
  socket.on('close', () => console.log('Disconnected from thr Browser'));

  // 브라우저에서 서버로 메시지가 도착했을때
  socket.on('message', (message) => {
    const messageConvert = message.toString('utf8');
    console.log(messageConvert);
  });

  // 브라우저로 메시지 보내기
  socket.send('hello🤚 from server');
});

server.listen(3000, handleListen);
