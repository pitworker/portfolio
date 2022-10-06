const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/makeIndex.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./src/makeIndex.js",
  },
  mode: "production",
  plugins: [
    new CopyWebpackPlugin([
      'index.html',
      'work.html',
      'about.html',
      'media/*',
      'src/*'
    ])
  ],
};
