const path = require('path');

module.exports = {
  mode: "production",
  context: path.resolve(__dirname),
  entry: {
    'scrapper': "./src/scripts/scrapper/scrapper.script.ts",
    'content-script': "./src/scripts/content/content.script.ts"
  },
  output: {
    path: path.resolve(__dirname, '../../dist/extension'),
    filename: "[name].js"
  },
  resolve: {
    alias: {
      '@shell-browser': path.resolve(__dirname, 'src')
    },
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
