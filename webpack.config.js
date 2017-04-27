var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  hash: true,
  filename: 'index.html',
  inject: 'body'
});
var HotReloader = new webpack.HotModuleReplacementPlugin();

let config = {
  devtool: 'source-map',
  entry: [
    './app/App.js'
  ],
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel',
        include: __dirname + '/app'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    contentBase: __dirname + '/dist',
    hot: false,
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.entry.splice(0, 0, 'webpack-dev-server/client?http://localhost:8080');
  config.entry.splice(1, 0, 'webpack/hot/dev-server');
  config.plugins.push(HotReloader);
  config.devServer.hot = true;
} else {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
  config.devtool = "cheap-module-source-map";
  config.output.path = "prod";
}

module.exports = config;
