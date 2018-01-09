const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*********************修改配置文件也要重启服务！！*****************************/
module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		 'jquery',
		path.join(__dirname, 'app/index.js')
		
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.tpl.html',
			inject: 'body',
			filename: './index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		//new webpack.NoErrorsPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:
					{
//						疑问presets:[['react','es2015']]报错
						presets:['es2015','react'],
//						实现热更新
						plugins: ["react-hot-loader/babel"] 

					}
//				use: [{
//						loader: 'babel-loader',
//						 options: {
//                        	presets: [['es2015','react']]
//                   	}
//					},{
//						loader: 'react-hot-loader/webpack',
//					}]
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			},

		]
	}
}
