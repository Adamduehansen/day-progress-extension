const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.ts',
    options: './src/options.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'extension'),
  },
};
