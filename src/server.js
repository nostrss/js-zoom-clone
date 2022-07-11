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
}

wss.on('connection', handleConnection);

server.listen(3000, handleListen);
