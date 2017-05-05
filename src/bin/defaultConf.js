/**
 * 默认配置
 */
'use strict'
module.exports =  {
	// 请求默认的延迟时间
	delay: 300,
	// 基础路径，假数据的URL则省略该路径不写
	// 建议前缀api
	base: '',
	// 服务端口，配合webpack的代理使用
	port: 3334,
	// 【必须】假数据文件目录相对路径(相对于node命令的执行路径)
	dataDir: '',
	// websocket 服务端口
	socket: 9096,
	// [必须] websocket 假数据文件目录相对路径(相对于node命令的执行路径)
	pushDir: '',
	//服务器启动模式，0 -> http, 1 -> socket, 2 -> both， 默认为http
	mode: 0,
	//服务器推送间隔
	interval:1000
}
