'use strict'
let WebSocket = require('ws');

module.exports = function(socketServer) {
    socketServer.broadcast = function(data) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    socketServer.on('connection', (ws) => {
        ws.on('message', (msg) => {
            console.log(msg);
        });

        ws.on('close', (msg) => {
            console.log(msg);
        });

        ws.send('hello, welcome to connect');
    });
}
