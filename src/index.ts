import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import {usernameAvailable, removeUsername,getData, addMessageToUser} from './utils';

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
  socket.emit('connected', { isConnected: true });
  socket.on('newUser', (data) => {
    console.log(data.username);
    const isAvailable = usernameAvailable(data.username, clientId);
    if(isAvailable){
      socket.emit('response newUser', {
        available:true,
        username: data.username,
        id: clientId,
      }); 
      io.emit('data updated',{onlineUsers:getData()});
    }else {
      socket.emit('response newUser', {
        available:false,
        username: data.username,
        id: clientId,
      }); 
    }
  });
  socket.on('send message', (request:any) => {
    addMessageToUser(request.username, request.message);
    console.log('teseting backend',getData());
    io.emit('data updated',{onlineUsers:getData()});
  });
  socket.on('disconnect', () => {
    removeUsername(clientId);
    console.log('Client disconnected', clientId);
  });
});
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
