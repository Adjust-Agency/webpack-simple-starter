const webpack 		= require("webpack");
const path 			= require("path");

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
				test: /\.styl$/,
				use:[
					{ loader: 'style-loader', options: { sourceMap: true }},
					{ loader: "css-loader"},
					{ loader: 'stylus-loader', options: { sourceMap: true }}
				]
			},
			{
				test: /\.pug$/,
				use:[
					{ loader: "pug-loader"}
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