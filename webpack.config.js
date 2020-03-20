const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //把css打包到一个文件里
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');//动态引入打包后的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//清理 webpack 清理目录插件 注意要加括号
module.exports = {
    entry: './src/index.js',//这是个入口，就是你要使用那个模块
    mode: 'development',//这个配置是要用什么模式去优化，有两个模式 不同的模式加载不同的插件进行优化
    output: { //输出  入口可以有多个但是出口只有一个 有2个参数  文件名 和目录的绝对路径
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ],
                //  include:[
                //      path.resolve(__dirname, "app/style.css"),
                //      path.resolve(__dirname, "vendor/style.css")
                //  ]
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/,
                include: [path.resolve(__dirname, 'src/' )],
                use: [
                    "file-loader",{
                        loader:'image-webpack-loader',// 优化图片资源的插件
                        options:{
                            mozjpeg:{ proogressive:true,quality:65 },
                            optipng:{ enabled:false },
                            pngquant:{ quality: '65-90', speed:4},
                            gifsicle: { interlaced: false},
                            webp: { quality: 75}
                        },
                    }
                    ]
            }
            //   {
            //     test: /\.(scss|sass|css)$/, // 正则匹配以.scss或者.sass结尾的文件
            //     use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            //   }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin({}),
        new UglifyJsPlugin({
            cache:true, parallel:true, sourceMap:true
        }),
        new HtmlWebpackPlugin ({
            title:'leo study',//生成的文件标题
            filename:'main.html',//最终生成的文件名，注意带后缀的
            minify:{
                removeComments:true,//移除注释
                collapseWhitespace:true,// 移除空格
                removeAttributeQuotes:true,// 移除双引号
            }
        }),
        new CleanWebpackPlugin({}),
    ]
}