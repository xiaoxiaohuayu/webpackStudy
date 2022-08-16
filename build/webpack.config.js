const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let time = new Date().getTime() + "";
module.exports = {
  mode: "development", // 模式
  entry: {
    main: path.resolve(__dirname, "../src/index.js"), // 入口文件
    header: path.resolve(__dirname, "../src/header.js"), // 入口文件
  },
  output: {
    filename: "[name].[fullhash].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录，不用新建，打包后自动生成
  }, // 输出文件
  plugins: [
    new CleanWebpackPlugin(), // 清除dist目录
    new HtmlWebpackPlugin({
      title: "webpack",
      // filename: "aa.html",
      template: path.resolve(__dirname, "../public/index.html"),
      templateContent: () => {
        return time;
      },
      inject: true, // true || 'head' || 'body' || false将所有资源注入到给定的 或 中。当传递时，所有javascript资源都将放置在body元素的底部。 会将脚本放在 head 元素中。通过会将其添加到头部/身体，具体取决于选项。通过将禁用自动注入。
      publicPath: "./",
      scriptLoading: "blocking", // blocking || defer || module 现代浏览器支持非阻塞 javascript loading() 以提高页面启动性能。设置为添加属性 type="module"。这也意味着“延迟”，因为模块会自动延迟。'defer''module'
      favicon: path.resolve(__dirname, "../public/favicon/1.ico"), // favicon路径
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      minify: "production", // {Boolean|Object} || mode || 'production' || false  压缩html
      hash: !true, // {Boolean} 后面加hash
      cache: true, // {Boolean} 缓存
      showErrors: true, // 如果出现错误 将错误写入html
      chunks: ["main"], // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      title: "header",
      template: path.resolve(__dirname, "../public/header.html"),
      filename: "header.html",
      chunks: ["header"], // 与入口文件对应的模块名
    }),
  ],
};
