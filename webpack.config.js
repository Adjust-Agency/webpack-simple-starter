require('dotenv').config()

const webpack 		= require("webpack");
const path 			= require("path");
const S3Plugin = require('webpack-s3-plugin')

let mode = process.env.NODE_ENV || "development"

module.exports = {
	mode: mode,
	
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: 'bundle' +  ( mode == 'production' ? '.min' : '')  + '.js'
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
	
	plugins: [
	    new S3Plugin({
	      include: /.*\.js/,
	      s3Options: {
	        accessKeyId: process.env.S3_ACCESS_KEY,
	        secretAccessKey: process.env.S3_SECRET_KEY,
	      },
	      s3UploadOptions: {
	        Bucket: process.env.S3_BUCKET + '/' + process.env.S3_FOLDER
	      }
	    })
	],
	
	devServer: {
		host: '0.0.0.0',
		publicPath: '/dist/',
		watchContentBase: true,
		writeToDisk: true,
		compress: true,
		port: 3000
	}
}