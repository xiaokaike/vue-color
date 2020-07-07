import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import pkg from '../package.json'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

// TODO: visualizer - Bundle and dependency visualizer.

const base = {
  input: 'src/index.ts',
  plugins: [
    vue({
      defaultLang: { script: 'ts' },
      needMap: false,
      template: {
        isProduction: true
      }
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.vue'],
      babelHelpers: 'runtime'
    }),
    resolve({
      extensions: ['.mjs', '.ts', '.js', '.json', '.node']
    }),
    commonjs()
  ]
}

const external = ['vue', ...Object.keys(pkg.dependencies)]

const esModuleBuild = {
  output: {
    file: 'dist/vue-color.es6.js',
    format: 'esm'
  },
  external: id => {
    if (external.includes(id)) {
      return true
    }
    if (id.startsWith('@babel/runtime')) {
      return true
    }
    return false
  }
}

const umdBuild = {
  output: {
    file: 'dist/vue-color.umd.js',
    format: 'umd',
    name: 'vueColor',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue']
}

export default [esModuleBuild, umdBuild].map(output => ({ ...base, ...output }))
