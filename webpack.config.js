const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    'scrapper': "./projects/extension/src/app/scripts/scrapper.ts",
    'content-script': "./projects/extension/src/app/scripts/content-script.ts"
  },
  output: {
    path: path.resolve(__dirname, './dist/extension'),
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
  devtool: 'cheap-module-source-map'
};
