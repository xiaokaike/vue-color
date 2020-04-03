import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// TODO: visualizer - Bundle and dependency visualizer.

const base = {
  input: 'src/index.ts',
  external: ['vue'],
  plugins: [
    vue({
      defaultLang: { script: 'ts' }
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.vue'],
    }),
    resolve({
      extensions: ['.mjs', '.ts', '.js', '.json', '.node']
    }),
    commonjs()
  ]
};

const esModuleBuild = {
  output: {
    file: 'dist/vue-color.min.mjs',
    format: 'esm',
  }
};

const umdBuild = {
  output: {
    file: 'dist/vue-color.min.js',
    format: 'umd',
    name: 'vueColor',
    globals: {
      'vue': 'Vue'
    }
  }
}

export default [esModuleBuild, umdBuild].map((output) => ({ ...base, ...output }));