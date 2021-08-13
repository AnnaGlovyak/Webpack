const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
// mode: 'development',
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
        template: './src/index.html',
        collapseWhitespace: true
    }),
    new ImageMinimizerPlugin({
        minimizerOptions: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                plugins: extendDefaultPlugins([
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                  {
                    name: "addAttributesToSVGElement",
                    params: {
                      attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                    },
                  },
                ]),
              },
            ],
          ],
        },
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
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "autoprefixer",
                        {
                          // Options
                        },
                      ],
                    ],
                  },
                },
              },
            ],
        },
     
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        },
        {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        },
    ],
    },
};
