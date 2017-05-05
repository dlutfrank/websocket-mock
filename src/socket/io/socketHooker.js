'use strict'
//处理来自socket层面的拦截
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
module.exports = function(socketServer) {
    socketServer.use(function(socket, next) {
        //console.log('socket intercept');
        next();
    });
    let data = require(global.__mockBroadCastDir);
    let conf = global.__mockConf;
    setInterval(function() {
        for (let Key in data) {
            let bc = data[Key];
            let duration = bc.interval || conf.interval;
            if (bc.response) {
                let now = Date.parse(new Date());
                if (!bc.lastTime || bc.lastTime + duration < now) {
                    bc.lastTime = now;
                    let res = bc.response;
                    if (typeof bc.response === 'function') {
                        res = bc.response(null);
                    }
                    if (!isEmptyObject(res)) {
                        console.log(Key, res);
                        socketServer.sockets.emit(Key, res);
                    }
                }
            }
        }
    }, 500);
}
