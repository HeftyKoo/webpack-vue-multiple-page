var path = require('path')
var vuxLoader = require('vux-loader')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var browserList = require('../package.json').browserslist

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// multiple project, each project has an entry
var entry = {}
var projects = config.projects
var alias = {
  'vue$': 'vue/dist/vue.esm.js'
}
projects.forEach(function (name) {
  entry[name] = './src/' + name + '/main.js'
  alias['@' + name[0].toLowerCase()] = resolve('src/' + name)
  alias['@' + name[0].toLowerCase() + 'a'] = resolve('src/' + name + '/assets')
})



module.exports = vuxLoader.merge({
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({ browsers: browserList }),
        ]
      }
    })
  ]},
  {
    options: {},
    plugins: [
      {
        name: 'vux-ui'
      },
      {
        name: 'duplicate-style'
      }
    ]
  }
)
