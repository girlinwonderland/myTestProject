const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require("./webpack.config.common");

module.exports = () => merge(baseConfig('dev'), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            modules: {
                                namedExport: false, // При namedExport: true модуль экспортируется: import * as style from my.css, а при false: import style from my.scss
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new ReactRefreshWebpackPlugin(), // Hot Reload
    ],
});
