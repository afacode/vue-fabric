
'use strict'

const path = require('path')

module.exports = {
  build: {
    testEnv: require('./test.env'),
    simEnv: require('./sim.env'),
    prodEnv: require('./prod.env'),
    envEnv: require('./env.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 9090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      
    },
    cssSourceMap: false
  }
}
