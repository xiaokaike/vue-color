var config = require('./webpack.config.js')

config.entry = {
  'vue-color': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'VueColor',
  libraryTarget: 'umd'
}


module.exports = config
