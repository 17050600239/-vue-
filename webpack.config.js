const path = require('path'); //path为当前根目录
//引入在内存中生成HTML页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');//引入vue-loader

module.exports = {
    entry: './src/main.js', //入口文件
    mode: 'development',
    output: {
        filename: 'bundle.js', //输出目标文件的名称
        path: path.resolve(__dirname, 'dist') //输入打包好的文件到指定目录
    },
    module: {
        rules: [{
            test: /\.(c|sc|le)ss$/, //当模块后缀满足.css .sass .scss
            use: [
                'style-loader', //将样式注入到html的style标签中
                {
                    loader: 'css-loader',
                    options: {
                        //启用sourceMap在查看样式时有提示在指定文件的第几行，有利于开发调试
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, { //处理图片路径loader
            test: /\.(jpg|png|gif|jpeg|bmp)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    //设置处理图片的大小限制，单位字节,
                    //也可设置为true或false，则不管图片大小启用或禁用
                    limit: 10000
                }
            }]
        }, {
            test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader'
            }
        },{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        }]
    },
    plugins: [
        new htmlWebpackPlugin({ //创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'), //指定需要在内存中模板页面路径
            filename: "index.html" //在内存中生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    // resolve:{
    //     alias: {  //必须在此修改导入的路径
    //         // "vue$" :"../node_modules/vue/dist/vue.js"
    //     }
    // }
};