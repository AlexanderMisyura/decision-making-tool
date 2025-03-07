import path from 'node:path';

import EslintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type webpack from 'webpack';

const dirname = import.meta.dirname;

const config = (isDevelopment: boolean): webpack.Configuration => ({
  entry: path.resolve(import.meta.dirname, './src/index.ts'),
  devtool: 'source-map',
  mode: isDevelopment ? 'development' : 'production',

  optimization: {
    minimize: false,
  },

  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(dirname, './dist'),
    assetModuleFilename: 'assets[name][est][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
      {
        test: /\.woff2$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                exportLocalsConvention: 'camel-case-only',
                localIdentName: isDevelopment ? '[local]_[hash:base64:8]' : '[hash:base64:8]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      { test: /\.ts$/i, use: 'ts-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Decision making tool',
      filename: 'index.html',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new EslintPlugin({ configType: 'flat', extensions: 'ts' }),
    new StylelintPlugin(),
  ],
});

export default config;
