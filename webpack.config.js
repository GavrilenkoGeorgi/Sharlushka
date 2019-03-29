const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const PUBLIC_PATH = '/';
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv && argv.mode || 'development',
  devtool: (argv && argv.mode || 'development') === 'production' ? 'source-map' : 'eval',

  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: PUBLIC_PATH
  },

  node: false,

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        },
        {
          loader: 'eslint-loader'
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss|.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'static', 'index.html'),
      inject: true,
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'sharlushkaMk9',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, 'dist'),
      toType: 'dir'
    }])
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: true,
        extractComments: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      // maxSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // priority: -10,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    mangleWasmImports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true
  },
  devServer: {
    compress: true,
    host: 'localhost',
    https: false,
    open: true,
    overlay: true,
    port: 9000
  }
})
