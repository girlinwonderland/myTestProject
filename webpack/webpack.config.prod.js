const MiniCss = require('mini-css-extract-plugin'); // Этот плагин извлекает CSS в отдельные файлы
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // минимизация css
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.common');

module.exports = () => merge(baseConfig('prod'),{
    mode: 'production',
    devtool: false,
    output: {
        publicPath: '/' // Базовый URL-адрес сборки вашего приложения, по которому оно будет опубликовано
    },
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: [
                    MiniCss.loader,
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
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCss({ filename: 'css/[name]_[contenthash].css' }),
    ],
});
