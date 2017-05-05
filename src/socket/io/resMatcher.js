'use strict'
function findEvent(eventName) {
    let data = require(global.__mockPushDir);
    return data[eventName] || data['/' + eventName];
}
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
const Mockjs = require('mockjs');
//根据event事件名称查找返回数据
module.exports = function(client, eventName, data) {
    let rule = findEvent(eventName);
    let resInfo = {
        find: false
    };
    if (rule) {
        resInfo.find = true;
        resInfo.responseName = rule.responseName;
        if (rule.response) {
            if (typeof rule.response === 'function') {
                resInfo.response = rule.response(client, data);
            } else {
                resInfo.response = rule.response;
            }
        }
        console.log(eventName, resInfo);
        if (!isEmptyObject(resInfo.responseName)) {
            if (!isEmptyObject(resInfo.response)) {
                resInfo.response = Mockjs.mock(resInfo.response);
            }
        }
    }
    return resInfo;
}
