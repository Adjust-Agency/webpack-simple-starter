const webpack 		= require("webpack");
const path 			= require("path");
const autoprefixer 	= require('autoprefixer');

module.exports = {
	mode: 'development',
	
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: 'bundle.js'
	},
	
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use:[
					{
						loader: 'style-loader', options: { sourceMap: true }
					},
					{ 	loader: 'postcss-loader', 
						options: {
									sourceMap: true,
									plugins: [
										autoprefixer({ browsers: ['last 2 versions', 'ie >= 9']})
									]
							}
					},
					{ loader: 'sass-loader', options: { sourceMap: true }}
				]
			},
			{
				
				test: /\.js$/, 
				exclude: /node_modules/, 
				use:[ 
						{
							loader: 'babel-loader',
							options: {
								presets: ['env'],
								plugins: ["babel-plugin-transform-class-properties"]
							}
						},
						{
							loader: 'eslint-loader',
							options: {
							    env: {
							    	browser: true,
									es6: true,
									jquery: true
								},
							    parser: "babel-eslint",
							    extends: "standard",
							    rules: {
							    	'no-tabs': 0,
									'eol-last': 0,
									indent: ["warn", "tab"]
								}
							}
						}
					]
			}
		]
	},
	
	devServer: {
		host: '0.0.0.0',
		publicPath: '/dist/',
		watchContentBase: true,
		writeToDisk: true,
		compress: true,
		port: 3000
	}
}