// file containing controller functions for CRUD operations performed on DB by using rawSQL queries through sequelize.

import sequelize_instance from '../configs/db_config.js';
import { log4connections, log4crud } from '../configs/responses.js';

// function to executes a raw SQL query on db to select all records from a table and sends result as a response.
const rawSelectAll = async (req, res) => {
	try {
		/* The line `const [query_res, query_metadata] = await sequelize_instance.query('SELECT * FROM
		users');` is executing a raw SQL query on the database to select all records from the "users"
		table. */
		const [query_res, query_metadata] = await sequelize_instance.query('SELECT * FROM users');
		// const customMessage = log4connections(true, 'db');
		res.status(200).json({
			message: log4connections(true, db),
			response: query_res,
		});
	} catch (error) {
		const customMessage = log4connections(false, 'db');
		console.error(customMessage);
		res.status(502).json({
			message: customMessage,
			error: error,
		});
	}
};

//* function to executes a raw SQL query for data insertion into table in a pre-configured db to select all records from a table and sends result as a response.
const rawCreateOne = async (req, res) => {
	const { column_names, values } = req.body;

	/* The code block is formatting the values received from the request body before inserting them into the database as strings are needed to be wrapped inside ''. */
	const formattedValues = values
		.map((valueArray) => {
			const formattedRow = valueArray
				.map((value) => {
					if (typeof value === 'string') {
						return `'${value}'`;
					}
					return value;
				})
				.join(', ');
			return `(${formattedRow})`;
		})
		.join(',');

	try {
		/* The line of code is executing a raw SQL query to insert data into the "users" table in the
		database. */
		const [query_res, query_metadata] = await sequelize_instance.query(`INSERT INTO users (${column_names.join(',')}) VALUES ${formattedValues}`);

		// * works for single query
		// const [response, metadata] = await sequelize_instance.query(`INSERT INTO users (id,name,email) VALUES (17,'any_name','any@mail.com');`);
		const customMessage = log4connections(true, 'db');

		res.status(200).json({
			message: customMessage,
			response: {
				message: 'successfully added values',
				values: formattedValues,
			},
			metadata: query_metadata,
		});
	} catch (error) {
		const customMessage = log4connections(false, 'db');

		console.error(customMessage);
		res.status(502).json({
			message: customMessage,
			error: error,
		});
	}
};

export { rawCreateOne, rawSelectAll };
