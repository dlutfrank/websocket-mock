#!/usr/bin/env node

'use strict'
let program = require('commander');
let pkg = require('../../package');
let defaultConf = require('./defaultConf');
let socketServer = require('../socket');
let server = require('../server');
let path = require('path');

program
.version(pkg.version)
.option('-v, --version', '版本号')
.option('-p --port [port]', '服务器端口 默认3334', parseInt)
.option('-s --socket [socket]', 'socket端口 默认9096', parseInt)
.option('-m --mode [mode]','服务启动模式 0 -> http, 1 -> socket, 2-> both',parseInt)
.option('-c --config [config]', '配置JSON文件路径').parse(process.argv);

let getConfig = function() {
    let cfg;
    if (program.config) {
        let confJson = require(path.resolve(program.config));
        cfg = Object.assign({}, defaultConf, confJson);
    } else {
        cfg = defaultConf;
    }
    if (program.socket) {
        cfg.socket = program.socket;
        cfg.socketEnable = true;
    }
    if (program.port) {
        cfg.port = program.port;
    }
    if (program.mode) {
        cfg.mode = program.mode;
    }
    return cfg;
};

let conf = getConfig();
if (conf.mode === 1) {
    socketServer(conf);
} else if(conf.mode ===2) {
    server(conf);
    socketServer(conf);
} else {
    server(conf);
}
