const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (envType) => ({
    entry: path.resolve('src', 'index.tsx'), // точка входа для сборки проекта
    output: {
        filename: '[name].[contenthash].js', // имя выходного файла сборки + хэш
        path: path.resolve(__dirname, '..', 'out'), // путь для выходного файла сборки
        clean: true, // перезаписывать файлы при пересборке
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: { // лоадры нужны чтобы вебпак смог читать файлы отличные от js
        rules: [
            {
                // Typescript compiler - это инструмент проверки типов и компиляции typescript в javascript.
                // Так же он умеет транспайлить конструкции новых стандартов js в более старые стандарты, но это не основная задача этого инструмента, и делает он это хуже целевых инструментов
                // Babel - это инструмент для парсинга js кода в AST.
                // Так же это еще и экосистема плагинов и пресетов. Плагины как правило реализуют транспиляцию одной из фич более нового стандарта в более старый. Пресеты - это просто конфигурируемый набор плагинов.
                // В экосистеме babel есть preset-env нацеленный именно на транспиляцию более новых стандартов в более старые. Его особенностью является поддержка browserlist и подключения только тех плагинов, которые нужны для указанных браузеров.
                // Еще в экосистеме babel есть preset-typescript, который включает поддержку ts синтаксиса и транспиляцию ts в js. При этом, в отличии от tsc, он не делает проверку типов
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(svg|gif|png|jpg|jpeg|webp)$/i, // обработка изображений
                type: 'asset/resource',
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, // обработка шрифтов
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(), // помещает проверку TypeScript и ESLint в отдельный процесс и тем самым разгружает ресурсы необходимые для сборки
        new webpack.DefinePlugin({
            ENV: JSON.stringify(envType),
        }),
        new HtmlWebpackPlugin({ // генерирует HTML-файл для приложения, с автоматической вставкой ссылок на сгенерированные JS и CSS
            template: path.resolve(__dirname, '..', 'public', 'index.html'),
            templateParameters: {
                // polyfill: getPolyfillHost(envType),
                title: envType === 'dev' ? 'testTitle' : 'prodTitle'
            },
        }),
    ],
});
