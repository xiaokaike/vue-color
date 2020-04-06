const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = require('./webpack.config.base');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',
  // mode: 'development',
  // optimization: {
  //   usedExports: true,
  // },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ],
});
