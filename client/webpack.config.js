const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  // API_URL зашивается на этапе сборки (не рантайма) через DefinePlugin ниже.
  // dev: абсолютный адрес NestJS-сервера. prod: относительный путь, который на VPS
  // разруливает reverse-proxy (см. коммит "fix: api url для деплоя на vps").
  const apiUrl = argv.mode === 'production' ? '/b2b-orders/api' : 'http://localhost:4000';

  return {
    // Точка входа. Этот файл ты создашь сама — это твой первый красный кирпич.
    entry: './src/app/index.tsx',
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      // Алиас FSD: импортируй из слоёв как '@/entities/...', '@/shared/...'
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    module: {
      rules: [
        { test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(apiUrl),
      }),
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true, // SPA-роутинг: любой путь отдаёт index.html
    },
  };
};
