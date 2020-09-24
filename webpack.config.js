const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpack = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoader = extra => {
  const loaders =  [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reloadALL: true
    },
  },
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

const babelOptions = preset => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  }

  if ( preset) {
    options.presets.push(preset)
  }
  return options
}

const optimization = ( ) => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpack()
    ]

  }

  return config;
}



const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const isDev = process.env.NODE_ENV == 'development'

console.log('IS DEV:', isDev)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill','./index.jsx'], //Входной/основной файл
    analytics: './analytics.ts',
  },
  output: {
    //filename: '[name].[contenthash].js', // Когда он соберет все файлы, мы получим bundle.js
    filename: filename( 'js' ),
    /*
    pattern [name] => main.bundle ; analytics.bundle
    pattern [contenthash]
    */
    path: path.resolve(__dirname, 'dist') //__dirname системная переменная текущей директории. 2. Все складывать в папку dist
  },
  resolve: {
    extensions: ['.js', '.json', '.png', 'ts'],
    alias:{
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
      'dir': path.resolve(__dirname, 'dist'),

    }
  },



  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
  module:{
    rules: [
      {
        test: /\.css$/,
        use: cssLoader( )
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoader('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test:/\.(ttf|woff|woff2|eot)$/,
        use:['file-loader']
      },
      {
        test:/\.xml$/,
        use:['xml-loader']
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  }
}