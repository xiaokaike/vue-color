import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';

// TODO: visualizer - Bundle and dependency visualizer.

const env = process.env.NODE_ENV;

const config = {
  input: 'example/main.js',
  output: {
    dir: 'example/dist',
    format: 'umd',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env === 'production' ? 'production' : 'development')
    }),
    resolve({
      extensions: ['.mjs', '.ts', '.js', '.json', '.node']
    }),
    vue(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    htmlTemplate({
      template: 'example/index.html',
      target: 'example/dist/index.html',
    }),
  ]
};

if(env !== 'production') {
  config.plugins.push(serve('example/dist'))
}

export default config;