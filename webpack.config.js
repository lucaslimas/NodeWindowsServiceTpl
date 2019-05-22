require('dotenv').config();
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    name: 'server',
    entry: './src/index.js',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'index.js',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        '__deploy__',
        {
          from: '.env-prod',
          to: '.[ext]',
          transformPath() {
            return '.env';
          },
        },
        {
          from: '.windows_service',
          to: 'bin/service.config.bat',
        },
      ]),
    ],
  },
];
