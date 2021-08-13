const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV || "development";
console.log('Is Dev: ', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
mode: 'development',
entry: {
    index: './index.js',
    print: './print.js',
    },
devtool: isDev == 'development' ? 'inline-source-map' : null,
devServer: {
    contentBase: './dist',
    hot: isDev
    },
plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        collapseWhitespace: true,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/favicon.ico'), 
        to: path.resolve(__dirname, "dist") },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
],
output: {
    filename: '[name].[contenthash].js',  //'[name].bundle.js'
    path: path.resolve(__dirname, 'dist'),
    clean: true,
},
resolve: {
  extensions: ['.js', '.json'],//можно не указывать такие разширения, при использовании файлов.Добавить можем любые
  alias: {
    '@components': path.resolve(__dirname, 'src/assets/components'),
    '@': path.resolve(__dirname,'src')
  }
},
module: {
    rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: isDev,     ///DON'T WORK
                // reloadAll: true
              }
            }, "css-loader"],
        },
     
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        // use: ['file-loader']dont working////WHY?
        },
        {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        // use: ['file-loader']//dont working////WHY?
        },
    ],
    },
};
