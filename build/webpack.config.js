const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 将打包好的js文件插入到html文件中
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除dist文件夹
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css提取到单独的文件中
let time = new Date().getTime() + "";
module.exports = {
  mode: "development", // 模式
  entry: {
    // main: {
    //   import: path.resolve(__dirname, "../src/index.js"),
    // }, // 入口文件
    main: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")], // 入口文件
    header: path.resolve(__dirname, "../src/header.js"), // 入口文件
  },
  output: {
    filename: "[name].[fullhash].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录，不用新建，打包后自动生成
  }, // 输出文件
  // 插件
  plugins: [
    new CleanWebpackPlugin(), // 清除dist目录
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css", // 打包后的css文件名称
      // chunkFilename: "[id].css", // 分包的css文件名称
    }), // 将css提取到单独的文件中
    new HtmlWebpackPlugin({
      title: "webpack",
      // filename: "aa.html",
      template: path.resolve(__dirname, "../public/index.html"),
      templateContent: () => {
        return `<div class='time_bg'>时间戳:${time}</div>`;
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
  module: {
    unsafeCache: false, // 开启缓存模块的来自 node_modules
    rules: [
      {
        test: /\.js$/,
        use: {
          // babel-loader只会将 ES6/7/8语法转换为ES5语法 但是对新api并不会转换
          // 例如(promise、Generator、Set、Maps、Proxy、Reflect、Symbol、Iterator、Proxy、Promise、Set、Maps、Proxy、Reflect、Symbol、Iterator)
          // 这时候就需要babel-polyfill 去转换了
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        // 排除node_modules文件夹下的文件
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, //css样式
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false, // export 'default' (imported as 'content') 出现警告 默认是通过模块导出的 这里我是直接引入的并不是导出 原因 ：https://frontendguruji.com/blog/warn-export-default-imported-as-content-was-not-found/
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 图片资源
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8kb的图片自动转成base64格式，并且不会存在实体图片
              fallback: {
                // 如果大于8kb的图片使用file-loader来处理 也可以去用其他的
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
