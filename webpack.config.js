module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/public/scripts',
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target:"http://localhost:3001/",
        secure:"false"
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[ext]'
        }
      }
    ]
  }
};