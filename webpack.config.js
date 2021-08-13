const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
mode: 'development',
entry: {
    index: './src/index.js',
    print: './src/print.js',
    },
// watch: NODE_ENV == 'development',
devtool: NODE_ENV == 'development' ? 'inline-source-map' : null,
devServer: {
    contentBase: './dist',
    },
plugins: [
    new HtmlWebpackPlugin({
        title: 'Development',
        // template: './index.html',
        // collapseWhitespace: true
    }),
],
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
},
module: {
    rules: [
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        },
    ],
    },
};
