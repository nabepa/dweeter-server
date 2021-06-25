import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      // 토큰을 socket.handshake.query로 주고 받으면 기록이 남아서 보안 문제
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
