const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

const config = {
  entry: {
    main: { import: __dirname + "/js/main.mjs", dependOn: "lit" },
    css: __dirname + "/js/css.mjs",
    agGrid: __dirname + "/js/agGrid.mjs",
    lit: { import: __dirname + "/js/lit.mjs" },
    nbBase: { import: __dirname + "/js/nb-element.mjs", dependOn: "lit" },
    nb: { import: __dirname + "/js/nb-components.mjs", dependOn: "nbBase" },
  },
  output: {
    path: __dirname + "/js",
    filename: "[name].[contenthash].mjs",
    library: {
      type: "module",
    },
  },
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              calc: false,
            },
          ],
        },
      }),
      "...",
    ],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/bundle.min.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: __dirname + "/css/src/themes/",
          to: __dirname + "/css/[name].min.css",
          globOptions: {
            ignore: ["**/default.css"],
          },
        },
        {
          from: __dirname + "/css/src/color/",
          to: __dirname + "/css/[name].palette.min.css",
          globOptions: {
            ignore: ["**/default.css"],
          },
        },
        {
          from: __dirname + "/css/src/color/base.css",
          to: __dirname + "/css/base.css",
        },
      ],
    }),
    new AssetsPlugin(),
  ],
  experiments: {
    outputModule: true,
  },
};
module.exports = config;
