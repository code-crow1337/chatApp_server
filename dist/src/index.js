"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var PORT = process.env.PORT || 4000;
app.set('port', PORT);
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
app.get('/', function (req, res) {
    res.send('OK');
});
io.on('connection', function (socket) {
    var connectedUsers = Object.keys(io.sockets.connected).length;
    console.log('New User connected');
    var clientId = socket.client.id;
    console.log('connected users', connectedUsers);
    console.log('connect users client id', clientId);
    socket.on('newUser', function (data) {
        socket.emit('response newUser', {
            username: data.username,
            id: clientId,
        });
    });
});
server.listen(PORT, function () { return console.log("Listening on port: " + PORT); });
