const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
	mode,
	target,
	devtool,
	entry: path.join(path.resolve(), 'src', 'index.js'),
	output: {
		path: path.join(path.resolve(), 'dist'),
		clean: true,
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(path.resolve(), 'src', 'index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')]
							}
						}
					},
					'sass-loader',
				],
			},
			{
				test: /\.woff2?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[ext]'
				}
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			}
		]
	},
	devServer: {
		port: 8080,
		open: true,
		hot: true,
	},
};
