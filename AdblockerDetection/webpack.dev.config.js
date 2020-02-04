const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: {
        'detect':'./prod/detect.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "dist/"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/env",
                                {
                                    "targets": {
                                        "ie": "11"
                                    }
                                }
                            ]
                        ],
                        plugins: ['@babel/plugin-transform-runtime', 'transform-class-properties'],

                    }
                }
            }
        ]
    },
    plugins: [
       new CleanWebpackPlugin('dist'),
       new MinifyPlugin({}, {
           comments:false,
       })
    ]
}