import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";

const module = JSON.stringify(process.env.NODE_ENV) || '"development"'
const devMode = module === '"development"';
const prodMode = !devMode
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const optimization = () => {
	const config = {
		splitChunks: { chunks: 'all' },
	}
	if (prodMode) {
		config.minimizer = [
			new CssMinimizerPlugin(),
			new TerserPlugin()
		]
	}
	return config;
}
const babelOptions = (preset, plugins) => {
	const obj = {
		presets: ['@babel/preset-env'],
		plugins: []
	};
	if (preset || plugins) {
		obj.presets.push(preset)
		obj.plugins.push(plugins)
	}
	return obj;
}

const config = {
	context: path.join(path.resolve(), 'src'),
	module,
	target,
	devtool,
	entry: './index.jsx',
	output: {
		path: path.join(path.resolve(), 'dist'),
		clean: true,
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[hash][ext]'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(path.resolve(), 'src', 'html', 'index.html'),
			minify: {
				collapseWhitespace: prodMode
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins:
						["imagemin-gifsicle",
							["imagemin-mozjpeg", { progressive: true, quality: 80 }],
							["imagemin-pngquant", { quality: [0.5, 0.7] }],
							"imagemin-svgo"]
				}
			},
			test: /\.(jpe?g|png|gif|svg)$/i,
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{ from: "source", to: "dest" },
		// 		{ from: "source", to: "dest" },
		// 	 ],
		// }),
	],
	resolve: {
		extensions: ['.js', '.json', '.xml', '.png', '.jpeg', '.jpg', '.webp', '.gif', '.svg', '.ttf', '.csv'],
		alias: {
			"@assets": path.join(path.resolve(), 'src', 'assets'),
			"@": path.join(path.resolve(), 'src'),
			"@html": path.join(path.resolve(), 'src', 'html'),
			"@js": path.join(path.resolve(), 'src', 'js'),
			"@scss": path.join(path.resolve(), 'src', 'scss'),
		}
	},
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
								plugins: ['postcss-preset-env']
							}
						}
					},
					'sass-loader',
				],
			},
			{
				test: /\.(ttf|eot|woff2?)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				}
			},
			{
				test: /\.(png|jpe?g|webp|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'asset/[name][ext]'
				}
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/i,
				use: ['csv-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions()
				}
			}, {
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript', '@babel/plugin-transform-typescript')
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react', '@babel/plugin-transform-react-jsx')
				}
			},
		]
	},
	optimization: optimization(),
	devServer: {
		port: 8080,
		open: true,
		hot: true,
	},
	devtool: devMode ? 'source-map' : false
};

export default config;
