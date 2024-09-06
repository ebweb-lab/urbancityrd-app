import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('MMORPG Game Server is running!');
});

io.on('connection', (socket) => {
  console.log('New player connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('Player disconnected: ', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
