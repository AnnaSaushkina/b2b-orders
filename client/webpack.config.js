const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  // прод отдаётся с корня собственного поддомена (b2b.frontbench.tech),
  // поэтому и API, и статика живут от корня — без префикса пути
  const apiUrl = argv.mode === 'production' ? '/api' : 'http://localhost:4000';

  return {
    entry: './src/app/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // хэш содержимого в имени: браузер перезапрашивает файл только когда он реально изменился.
      // без этого main.js всегда одноимённый и залипает в кэше после деплоя
      filename: argv.mode === 'production' ? '[name].[contenthash:8].js' : '[name].js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    module: {
      rules: [
        { test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
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
      historyApiFallback: true,
    },
  };
};
