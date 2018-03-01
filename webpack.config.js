const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const webpack = require('webpack');

module.exports = options => {
  return {
    devtool: 'inline-source-map',
    entry: {
      react: './src/react/index.jsx',
      vue: './src/vue/main.js'
    },
    output: {
      filename: '[name].js'
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': 'src/vue'
      },
      extensions: ['.js', '.ts', '.jsx', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'awesome-typescript-loader',
            'angular2-template-loader'
            ]
        },
        {
          test: /\.html$/,
          exclude: ['./src/index.html'],
          use: 'html-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [ 'to-string-loader', 'css-loader' ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new FriendlyErrorsPlugin(),
      new HtmlWebpackPlugin({
        title: 'React/Vue Stopwatches',
        template: 'src/index.html',
      }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ['src/styles.css'],
        append: false
      })
    ],
    devServer: {
      port: 8000,
      host: 'localhost',
      compress: true,
      quiet: true,
      inline: false,
      historyApiFallback: true
    }
  }
};
