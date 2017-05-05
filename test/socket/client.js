let io = require('socket.io-client');
//io.reconnection(false);
let conf = require('../conf');
let port = conf.socket || 9096;
let addr = 'http://localhost:' + port;

let client = io(addr);
client.on('connect', () => {
    console.log('connect');
    //client.send('client connected');
    // client.emit('my event','msg from client');
    // client.emit('my event', {
    // 	name: 'frank',
    // 	age: 18
    // });
});
client.on('message', (msg) => {
    //收到服务端来的普通消息
    console.log('message', msg);
});
client.on('info', (msg) => {
    console.log('info: ', msg);
});
client.on('serverConnectSuccess', (msg) => {
    console.log('server conn success: ', msg);
    client.emit('clientSyncEvent', {token: '112321321'});
});
client.on('serverSyncEvent', (msg) => {
    console.log('server data', msg);
});
// client.on('bieber tweet', (msg) => {
// 	console.log(msg);
// });
// client.on('local event', (msg) => {
// 	console.log(msg);
// });
client.on('my event', (msg) => {
    //收到服务端来的自定义消息
    console.log('my event: ', msg);
});
client.on('ack event', (name, callback) => {
    //收到服务端带回复的消息
    console.log('name:', name);
    callback('Frank(client)');
});
client.on('connecting', (msg) => {
    console.log('connecting', msg);
});
client.on('disconnect', (msg) => {
    console.log('disconnect', msg);
});
client.on('connect_failed', (msg) => {
    console.log('connect_failed', msg);
});
client.on('error', (msg) => {
    console.log('error', msg);
});
client.on('reconnect_failed', (msg) => {
    console.log('reconnect_failed', msg);
});
client.on('reconnect', (msg) => {
    console.log('reconnect', msg);
});
client.on('reconnecting', (msg) => {
    console.log('reconnecting', msg);
});
