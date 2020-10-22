"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = __importDefault(require("socket.io"));
var utils_1 = require("./utils");
var app = express_1.default();
var PORT = process.env.PORT || 4000;
app.set('port', PORT);
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
app.use(cors_1.default());
app.get('/', function (req, res) {
    res.send('OK');
});
io.on('connection', function (socket) {
    var connectedUsers = Object.keys(io.sockets.connected).length;
    var clientId = socket.client.id;
    socket.emit('connected', { isConnected: true });
    socket.on('newUser', function (data) {
        var isAvailable = utils_1.usernameAvailable(data.username, clientId);
        if (isAvailable) {
            socket.emit('response newUser', {
                available: true,
                username: data.username,
                id: clientId,
            });
            io.emit('data updated', { onlineUsers: utils_1.getData() });
        }
        else {
            socket.emit('response newUser', {
                available: false,
                username: data.username,
                id: clientId,
            });
        }
    });
    socket.on('send message', function (request) {
        utils_1.addMessageToUser(request.username, request.message);
        io.emit('data updated', { onlineUsers: utils_1.getData() });
    });
    socket.on('disconnect', function () {
        utils_1.removeUsername(clientId);
    });
});
server.listen(PORT, function () { return console.log("Listening on port: " + PORT); });
