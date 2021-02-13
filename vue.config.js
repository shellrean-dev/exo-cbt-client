const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
};