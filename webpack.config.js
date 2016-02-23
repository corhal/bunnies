module.exports = {
  devtool: 'source-map',
  entry: './src/client/main.js',
  output: {
    filename: './src/client/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.webpack.js', '.web.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0']
      }
    ]
  }
};
