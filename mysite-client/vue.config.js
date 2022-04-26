
// vue/cli 的配置文件
module.exports = {
	devServer: {
		proxy: {
			'/task': {
				// 学习代理解决跨域
				target: 'https://zhidao.baidu.com'
			},
			'/api': {
				target: 'http://127.0.0.1:7001'
			},
			"/static": {
				target: "http://127.0.0.1:7001"
			}
		}
	},
	configureWebpack: require('./webpack.config'),
}