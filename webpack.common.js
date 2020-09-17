const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.APP_ENV === 'development';

const baseFilename = isDev ? 'bundle' : 'bundle.[contenthash]';

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
            filename: `assets/css/${baseFilename}.css`,
        }),
        new FaviconsWebpackPlugin({
            logo: './src/logo.png',
            mode: 'light',
        }),
        new ManifestPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `assets/js/${baseFilename}.js`,
    }
}