'use strict';
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },

  },
  chainWebpack: (config) => {
    config.plugin('fork-ts-checker').tap(([options]) => [{
      async: false,
      tslint: true,
      vue: true,
    }]);
    config.resolve.alias
      .set('@store', resolve('src/store'))
      .set('@components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
  },
  productionSourceMap: false,
}