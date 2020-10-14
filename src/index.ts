import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const PORT = process.env.PORT || 4000;
app.set('port', PORT);
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('OK');
});

io.on('connection', (socket) => {
  const connectedUsers = Object.keys(io.sockets.connected).length;
  console.log('New User connected');
  const clientId = socket.client.id;
  console.log('connected users', connectedUsers);
  console.log('connect users client id', clientId);
  socket.on('newUser', (data) => {
    socket.emit('response newUser', {
      username: data.username,
      id: clientId,
    });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected', clientId);
  });
});
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
