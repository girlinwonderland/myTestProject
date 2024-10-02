module.exports = {
  presets: [
    '@babel/preset-env', // транспиляция более новых стандартов в более старые
    '@babel/preset-typescript', // поддержка ts синтаксиса и транспиляцию ts в js
    ['@babel/preset-react', { runtime: 'automatic' }], // преобразовывает в JavaScript и JSX-код
  ],
  plugins: [ '@babel/plugin-transform-runtime' ] // смотрит код на наличие ES6 фич и если они есть, трансформирует код так, чтобы эти фичи брались не из глобального скоупа, а импортировались из babel-runtime.
};
