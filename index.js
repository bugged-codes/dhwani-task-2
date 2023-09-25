// backend-server entry file

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './server/routes/router.js';
import { log4express, log4connections } from './server/configs/responses.js';
import sequelize_instance, { database_models } from './server/configs/db_config.js';

// instantiation
const app = express();

// variables
const PORT = process.env._PORT;
// const whitelist = ['http://127.0.0.1'];
const corsOptions = {
	/* FIXME tried dynamic origin whitelisting, could not get it working.
    origin: function (origin, callback) {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}, */
	origin: ['http://127.0.0.1'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) =>
	res.status(200).json({
		message: 'connection is successful but, dynamic response json not configured',
	})
);
app.use('/api', router);

/* FIXME
app.all('*', cors(corsOptions), (req, res, next) => {
	res.json({ message: 'this is cors enabled only for whitelisted domains.' });
}); */

// server listening event with error-handling of 2 most common port errors.
const server = app
	.listen(PORT, () => {
		const protocol = 'http';
		const host = server.address().address === '::' ? '127.0.0.1' : server.address().address;
		const port = server.address().port;
		console.info(log4express(port, protocol, host));
	})
	.on('error', (error) => {
		/* The `.on('error', ...)` is an event listener that listens for any errors that occur during the server's `listen` event. If an error occurs, the callback function is executed. */
		/*Even though express provides default error handling, this is used to point out error without cluttering up console*/
		if (error.syscall !== 'listen') {
			throw error;
		}

		// Handle specific error cases
		switch (error.code) {
			case 'EACCES':
				console.error(`V Cannot access ${PORT}, it may require elevated privileges.`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`V Port ${PORT} is already in use.`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	});
