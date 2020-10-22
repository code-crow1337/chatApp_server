import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIO from 'socket.io';
import {usernameAvailable, removeUsername,getData, addMessageToUser} from './utils';

const app = express();
const PORT = process.env.PORT || 4000;
app.set('port', PORT);
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());
app.get('/', (req: express.Request, res: express.Response):void => {
  res.send('OK');
});

io.on('connection', (socket:socketIO.Socket):void => {
  const connectedUsers = Object.keys(io.sockets.connected).length;
  const clientId = socket.client.id;
  socket.emit('connected', { isConnected: true });
  socket.on('newUser', (data) => {

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
    io.emit('data updated',{onlineUsers:getData()});
  });
  socket.on('disconnect', () => {
    removeUsername(clientId);
  });
});
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
