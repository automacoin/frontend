const common = require('./webpack.common');
const { default: merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
})