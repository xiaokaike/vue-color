const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.config.base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',
  // split vendor js into its own file
  optimization: {
    splitChunks: {
      name: 'vendor',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // extract css into its own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contenthash].css'
    }),
  ],
});
