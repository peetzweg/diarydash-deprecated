const path = require('path');
const webpack = require('webpack');

module.exports = {

	devtool: 'cheap-module-source-map',
	entry: './src/js/diarydash.js',
	output: {
		path: './dist/js',
		filename: 'diarydash.bundle.js',
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react', 'stage-1']
			}
		}]
	},

};
