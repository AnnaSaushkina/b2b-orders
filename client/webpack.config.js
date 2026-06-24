const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // SPA-роутинг: любой путь отдаёт index.html
  },
};
