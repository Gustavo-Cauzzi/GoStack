const path = require('path');

module.exports = {
  entry:  path.resolve(__dirname,'src','index.js'),
  output:{
    path: path.resolve(__dirname,'public'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude :/node_modules/,
        use:[
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  },
  devServer:{
    contentBase: path.resolve(__dirname, 'public')
  }
}