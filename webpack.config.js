const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use your existing index.html as a template
    }),
  ],
};