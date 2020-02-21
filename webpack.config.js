var path = require("path");
var Html = require('html-webpack-plugin');
var MiniCSS = require("mini-css-extract-plugin");

var browsers = [
  'ie 11'
];

module.exports = (env) => {
  var isDev = env.dev ? true : false;

  return {
    entry: "./js/app.js",
    output: {
      filename: "out.js",
      path: path.resolve(__dirname, "build")
    },
    plugins: [
      new Html({
          filename: 'index.html',
          template: './index.html'
      }),
      new MiniCSS({
        filename: "app.css",
      })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    targets: {
                      browsers: browsers
                    }
                  }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: [
              isDev ? 'style-loader' : MiniCSS.loader,
              'css-loader', 
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              },
              'sass-loader']
          },
          {
            test: /\.(jpg|jpeg|gif|png|csv)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'images',
                outputPath: 'images'
              }
            }
          },
          {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'fonts',
                outputPath: 'fonts'
              }
            }
          }
        ]
    }
}}