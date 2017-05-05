'use strict'
let resMatcher = require('./resMatcher')
const Mockjs = require('mockjs');
//处理来自client层面的拦截
module.exports = function(client) {
    client.use(function(packet, next) {
        console.log('packet intercept', packet);
        try {
            let resInfo = resMatcher(client, packet[0], packet[1]);
            if (resInfo.find) {
                client.emit(resInfo.responseName, resInfo.response);
            } else {
                return next(new Error(packet[0] + 'Mock查找规则失败'));
            }
        } catch (e) {
            console.error('Mock数据规则执行错误', e);
            return next(new Error(packet[0] + ' Mock数据规则执行错误'));
        }
    });
}
