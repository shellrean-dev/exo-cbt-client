const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");

module.exports = {
  publicPath: '/admin-system/',
  outputDir: path.resolve(__dirname, "../exo-cbt-service/public/admin-system"),
  filenameHashing: false,
  runtimeCompiler: true,
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
};
