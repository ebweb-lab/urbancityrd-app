import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Almacenar los jugadores y sus posiciones
const players: { [id: string]: { x: number, y: number } } = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New player connected: ', socket.id);

  // Asignar una posición inicial al nuevo jugador
  players[socket.id] = { x: 250, y: 250 };

  // Cuando el jugador se mueva, actualizamos su posición
  socket.on('move', (position) => {
    players[socket.id] = position;
    io.emit('playersUpdate', Object.values(players));
  });

  // Cuando un jugador se desconecte, lo eliminamos de la lista
  socket.on('disconnect', () => {
    console.log('Player disconnected: ', socket.id);
    delete players[socket.id];
    io.emit('playersUpdate', Object.values(players));
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
