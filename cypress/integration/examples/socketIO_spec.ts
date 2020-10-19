import express from 'express';
import io from 'socket.io-client';

describe('Socket IO test', () => {

  it('on new user on / should recive message and id', (done) => {
    const socket = io.connect('http://localhost:4000');
    socket.on('connect', () => {
      console.log('success');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    const username = 'GeraltOfRivia';
    socket.emit('newUser', { username });
    socket.on('response newUser', (data: any) => {
      expect(data).to.have.keys('username', 'id');
      expect(data.username).to.be.equal(username);
    });
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      console.log('no connection to break...');
    }
    done();
  });

  it('Should only be one user per socket', (done) => {
    const socket2 = io.connect('http://localhost:4000');
    socket2.on('connect', () => {
      console.log('second socket connected');
    });
    socket2.on('disconnect', () => {
      console.log('second socket disconnected');
    });
    const username = 'GeraltOfRivia2';
    socket2.emit('newUser', { username });
    socket2.on('response newUser', (data: any) => {
      expect(data).to.have.keys('username', 'id');
      expect(data.username).to.be.equal(username);
    });
    if (socket2.connected) {
      console.log('second socket disconnecting...');
      socket2.disconnect();
    } else {
      console.log('second socket no connection to break...');
    }
    done();
  });
});
