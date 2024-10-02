const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
    const config = require('./webpack.config.prod')();

    return {
        ...config,
        optimization: {
            ...config.optimization,
            concatenateModules: false
        },
        plugins: [...config.plugins, new BundleAnalyzerPlugin()]
    }
}
