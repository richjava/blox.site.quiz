const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const Blox = require('building-blox');

require('dotenv').config();

module.exports = async (env, argv) => {
  const blox = new Blox({
    mode: argv.mode,
    apiEndpoint: process.env.API_ENDPOINT,
    apiKey: process.env.API_KEY,
    itemsPerPage: 1
  });

  const pages = await blox.getPages();
  return {
    mode: argv.mode,
    entry: blox.getEntry(),
    devServer: {
      contentBase: './src',
      open: true
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'assets/js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.njk$/,
          use: [
            {
              loader: `nunjucks-isomorphic-loader`,
              query: {
                root: [path.resolve(__dirname, './src/templates')]
              }
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            {
              loader: "sass-loader", options: {
                sassOptions: {
                  sourceMap: true,
                  includePaths: [
                    path.join(__dirname, 'src')
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'tslint-loader'
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  '@babel/preset-env'
                ]
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: "assets/images/[name].[ext]"
              }
            }
          ]
        },
        // {
        //   test: /\.svg/,
        //   use: {
        //     loader: 'svg-url-loader',
        //     options: {
        //       name: "assets/images/[name].[ext]"
        //     }
        //   }
        // },
        {
          test: /\.svg/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images'
            }
          }]
        },
        // {
        //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        //   use: [{
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'fonts/'
        //     }
        //   }]
        // }
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins: [
      ...pages,
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      }),
      new ExtraWatchWebpackPlugin({
        dirs: ['templates']
      }),
      new CopyWebpackPlugin([
        {
          from: './src/assets/images/*',
          to: 'assets/images/',
          flatten: true,
          force: true
        }
      ], { copyUnmodified: true }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false
            }
          }
        })
      ]
    }
  };
};
