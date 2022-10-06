const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/makeIndex.js",
  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "./src/makeIndex.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin([
      'index.html',
      'work.html',
      'about.html',
      'src/*',
      'media/*'
    ])
  ],
};
