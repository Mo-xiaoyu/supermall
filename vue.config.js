const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  devServer: {
  	overlay: { //让浏览器 overlay 同时显示警告和错误
  		warnings: true,
  		errors: true
  	},
  	host: "localhost",
  	port: 8010,
  	open: false,
  	hotOnly: true
  },
  chainWebpack: config => {
    //配置别名
  	config.resolve.alias
  		.set("@", resolve("src"))
  		.set("assets", resolve("src/assets"))
  		.set("common", resolve("src/common"))
  		.set("components", resolve("src/components"))
  		.set("network", resolve("src/network"))
  		.set("views", resolve("src/views"))
    //配置title
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "商城"
        return args
      })
  }
}