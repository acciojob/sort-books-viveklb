const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin= require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname,"/dist"),
        filename: "index_bundle.js",
    },
    module:{
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.NYT_API_KEY": JSON.stringify(process.env.NYT_API_KEY || "")
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
