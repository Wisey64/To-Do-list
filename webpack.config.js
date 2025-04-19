const path = require('path');

module.exports = {
  entry: './src/index.js',              // entry point
  output: {
    filename: 'main.js',                // output bundle
    path: path.resolve(__dirname, 'dist'), // output folder
    clean: true                         // clean old builds
  },
  mode: 'development',                  // dev mode
};
