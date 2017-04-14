'use strict'
let express = require('express');

let http = require('http');
let path = require('path');
let WebSocket = require('ws');
let bodyParser = require('body-parser');
let multer = require('multer');
let cookieParser = require('cookie-parser')

let app = express();

let dispatcher = require('./dispatcher');
let watcher = require('../common/watcher');

module.exports = function(conf) {
    if (!conf.socket) {
        console.error('Mock服务缺少合法端口');
        return;
    }
    if (!conf.pushDir) {
        console.error('Mock服务缺少合法假数据文件');
        return;
    }
    // 配置文件缓存
    global.__mockConf = conf;
    // 数据文件完整路径
    global.__mockPushDir = path.resolve(conf.pushDir);
    //route(app);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());
    let server = http.createServer(app);
    let wss = new WebSocket.Server({server});
    dispatcher(wss);
    server.listen(conf.socket, () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log('Mock Socket服务启动（ws://%s:%s）', host, port);
        watcher.start(conf.pushDir);
    })
    // let server = app.listen(conf.socket, () => {
    // 	let host = server.address().address;
    // 	let port = server.address().port;
    // 	console.log('Mock服务启动（http://%s:%s）', host, port);
    // 	watcher.start()
    // });
}
