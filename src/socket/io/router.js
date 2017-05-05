'use strict'
//let WebSocket = require('ws');
let socketHooker = require('./socketHooker');
let clientHooker = require('./clientHooker');
let resMatcher = require('./resMatcher');
module.exports = function(socketServer) {
    socketHooker(socketServer);
    socketServer.on('connection', (client) => {
        clientHooker(client);
		let resInfo = resMatcher(client,'connection');
		if (resInfo && resInfo.find) {
			client.emit(resInfo.responseName,resInfo.response);
		}
    });

}
