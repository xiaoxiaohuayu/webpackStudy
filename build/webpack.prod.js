const { merge } = require("webpack-merge"); // 用于合并配置
const CompressionPlugin = require("compression-webpack-plugin"); // 压缩打包文件插件
const baseWebpackConfig = require("./webpack.config.js");
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  // module: {
  //   rules: [
  // 处理 css 文件
  // {
  //   test: /\.css$/,
  //   use: ["style-loader", "css-loader", "postcss-loader"],
  // },
  // 处理 scss 文件
  // {
  //   test: /\.scss$/,
  //   use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
  // },
  //   ],
  // },
  plugins: [
    // 压缩文件
    new CompressionPlugin({
      test: /.(js|css)(\?.*)?$/, // 只压缩 js 和 css 文件
      algorithm: "gzip", // 压缩算法，默认为 gzip
      threshold: 10240, // 文件大于 10 KB 时才压缩，默认为 0
      minRatio: 0.8, // 只有当文件压缩后的比率小于这个值时，文件才会被压缩，默认值 0.8
      deleteOriginalAssets: false, // 是否删除原文件，默认为 false
    }),
  ],
  // 优化配置
  optimization: {
    splitChunks: {
      chunks: "all", // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值
      hidePathInfo: false, //为由 maxSize 分割的部分创建名称时，阻止公开路径信息
      // cacheGroups: { // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项
      //   vue_lib: {
      //     test: /[\\/]node_modules[\\/](vue|vue-router|vuex)/,
      //     name: "vue_lib",
      //   },
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //     reuseExistingChunk: true,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // default: false, // 禁用默认缓存组
      // defaultVendors: false, // 禁用默认缓存组
      // },
    },
  },
});

module.exports = devWebpackConfig;
