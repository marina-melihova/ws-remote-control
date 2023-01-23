const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  plugins: [new (require('webpack').ExternalsPlugin)('commonjs', ['@nut-tree/nut-js'])],
};
