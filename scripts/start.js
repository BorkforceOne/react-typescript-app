'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require("webpack");
const Agent = require("agentkeepalive");
const config = require('../config/webpack.config.dev.hot');
const proxy = require('http-proxy-middleware');
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const paths = require('../config/paths');

// Ensure environment variables are read.
require('../config/env');

const app = express();
const compiler = webpack(config);

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const proxyTarget = "http://localhost:58065/";
const proxyEndpoint = "/api";

const start = () => {
	// Warn and crash if required files are missing
	if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs]))
		process.exit(1);

	// Makes the script crash on unhandled rejections instead of silently
	// ignoring them. In the future, promise rejections that are not handled will
	// terminate the Node.js process with a non-zero exit code.
	process.on('unhandledRejection', err => {
		throw err;
	});

	app.use(proxyEndpoint, proxy(
		{
			target: proxyTarget,
			changeOrigin: true,
			agent: new Agent({
				maxSockets: 100,
				keepAlive: true,
				maxFreeSockets: 10,
				keepAliveMsecs: 100000,
				timeout: 6000000,
				keepAliveTimeout: 90000 // free socket keepalive for 90 seconds
			}),
			onProxyRes: (proxyRes) => {
				const key = 'www-authenticate';
				proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
			}
		}
	));

	app.use(webpackDevMiddleware(compiler,
		{
			hot: true,
			historyApiFallback: true,
			contentBase: config.output.path,
			publicPath: config.output.publicPath,
			headers: { 'Access-Control-Allow-Origin': '*' }
		}));

	app.use(webpackHotMiddleware(compiler, {}));

	app.listen(DEFAULT_PORT, HOST, (err, result) => {
		if (err)
			return console.error(err);
		console.log(`Webpack Dev Server is fired up on ${HOST}:${DEFAULT_PORT} buckaroo!`);
	});
};

start();