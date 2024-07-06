const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    filename: path.resolve(__dirname, "src/scripts/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[name][ext]",

    //Псевдоним который указан в entry для изменение названия выходного файла.
    filename: "[name][contenthash].js",

    clean: true,
  },

  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },

  devServer: {
    port: 3000,
    compress: true,
    hot: true,

    // static: {
    //   //Показывать статические файлы в папке dist
    //   directory: path.join(__dirname, "dist"),
    // },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/scripts"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.(svg|png|jpg|jpeg|webp)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),

    new HtmlWebpackPlugin({
      title: "CPS",
      // templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id="app"></div></body></html>',
      filename: "index.html",
      template: "./src/index.html",
      minify: {
        removeComments: true,
      },
    }),
  ],
};
