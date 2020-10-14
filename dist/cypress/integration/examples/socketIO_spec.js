"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
describe('Socket IO test', function () {
    /*   let socket: any;
    beforeEach((done) => {
      socket = io.connect('http://localhost:4000');
      socket.on('connect', () => {
        console.log('success');
        done();
      });
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
    afterEach((done) => {
      if (socket.connected) {
        console.log('disconnecting...');
        socket.disconnect();
      } else {
        console.log('no connection to break...');
      }
      done();
    }); */
    it('on new user on / should recive message and id', function (done) {
        var socket = socket_io_client_1.default.connect('http://localhost:4000');
        socket.on('connect', function () {
            console.log('success');
        });
        socket.on('disconnect', function () {
            console.log('disconnected');
        });
        var username = 'GeraltOfRivia';
        socket.emit('newUser', { username: username });
        socket.on('response newUser', function (data) {
            expect(data).to.have.keys('username', 'id');
            expect(data.username).to.be.equal(username);
        });
        if (socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        }
        else {
            console.log('no connection to break...');
        }
        done();
    });
    it('Should only be one user per socket', function (done) {
        var socket2 = socket_io_client_1.default.connect('http://localhost:4000');
        socket2.on('connect', function () {
            console.log('second socket connected');
        });
        socket2.on('disconnect', function () {
            console.log('second socket disconnected');
        });
        var username = 'GeraltOfRivia2';
        socket2.emit('newUser', { username: username });
        socket2.on('response newUser', function (data) {
            expect(data).to.have.keys('username', 'id');
            expect(data.username).to.be.equal(username);
        });
        if (socket2.connected) {
            console.log('second socket disconnecting...');
            socket2.disconnect();
        }
        else {
            console.log('second socket no connection to break...');
        }
        done();
    });
});
