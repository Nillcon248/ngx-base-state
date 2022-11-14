const path = require('path');

module.exports = {
  mode: "production",
  context: path.resolve(__dirname),
  entry: {
    'scrapper': "./src/scrapper.ts",
    'content-script': "./src/content-script.ts"
  },
  output: {
    path: path.resolve(__dirname, '../../dist/extension'),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { 
        test: /\.ts?$/,
        loader: "ts-loader"
      }
    ]
  },
  optimization: {
    usedExports: true
  }
};
