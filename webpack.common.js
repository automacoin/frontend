const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: [
        path.resolve(__dirname, 'src', 'index.js'),
        path.resolve(__dirname, 'src', 'styles.scss'),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Copyright (c) 2020 AutomaCoin'
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/styles.[contenthash].css',
            chunkFilename: '/assets/css/styles.[id].css', 
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new HtmlWebpackPlugin({
            template: './dist/11ty-output/index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './src/logo.png',
            mode: 'light',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/public', to: 'assets' }
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'build'),
        filename: 'assets/js/bundle.[contenthash].js',
    }
}