const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  filenameHashing: false,
  runtimeCompiler: true,
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
};
