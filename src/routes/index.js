var createError = require('http-errors');
const fs = require('fs');
const _ = require('lodash')
const path = require('path')

let routes = []

module.exports.init = (app) => {

	fs.readdirSync(__dirname)
		.filter(file => {
			return (file.indexOf('.') !== 0) && (file.slice(-8) === 'route.js')
		}).forEach(file => {
			const route = require(path.join(__dirname, file))
			routes.push(route)
		})


	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Headers',
			'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
		res.header('Access-Control-Max-Age', '86400')
		res.header('Content-Type', 'application/json')
		if (req.method === 'OPTIONS') {
			res.sendStatus(200)
		} else {
			next()
		}
	})

	// route configuration
	routes = _.orderBy(routes, ['order'])
	const routeConsole = []
	for (let routeConfig of routes) {
		if (typeof routeConfig === 'function')
			routeConfig = routeConfig(app)
		if (!!routeConfig.middlewares)
			app.use(routeConfig.path, ...routeConfig.middlewares,
				routeConfig.router)
		else
			app.use(routeConfig.path, routeConfig.router)
		routeConsole.push(routeConfig)
	}
	console.table(routeConsole, ['order', 'path', 'filename'])

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		res.status(404)
		next(createError(404));
	})

	// error handler
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		const e = { message: err.message, status: err.status || res.statusCode }
		e.stack = req.app.get('env') === 'development' ? err.stack : {};
		res.send(e);
	})
}
