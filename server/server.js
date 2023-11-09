import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8888;

// Set up serial port
const serialPort = new SerialPort('/dev/tty-usbserial1');
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));

// Server start
server.listen(port, () => console.log('on port' + port))

const __dirname = dirname(fileURLToPath(import.meta.url));
// Use server
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  // When data is received from the serial port, send it to the client
  parser.on('data', (data) => {
    console.log(data);
    socket.emit('serial-data', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});