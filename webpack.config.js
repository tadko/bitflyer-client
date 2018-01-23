'use strict';

const path = require('path');

module.exports = {
    target: 'node',
    externals: /^(?!^\.\/)/,
    context: path.join(__dirname, 'src'),
    entry: './index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devtool: 'source-map'
};
