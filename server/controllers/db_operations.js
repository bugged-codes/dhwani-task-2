// file containing single, static controller functions for CRUD operations performed on DB by using sequelize models/schemas.
// NOTE - before using these routes, configure it by specifying on which table/model should the queries be run.

import { database_models } from '../configs/db_config.js';

const findAll = async (req, res) => {
	try {
		// * specify model on the next line
		const queryResponse = await database_models.users.findAll();

		res.status(200).json({
			status: true,
			message: 'connection successful',
			response: {
				message: 'Query execution successful',
				value: queryResponse,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: false,
			message: 'connection failed',
			response: {
				message: 'query execution failed',
				value: error,
			},
		});
	}
};

const createOne = async (req, res) => {
	const { name, mobile, email, password, roleId } = req.body;
	// try {
	// 	const model = database_models.households;
	// 	const createStatus = await model.create({ name, mobile, email, aadhar, address, family_members_count: count, village_id });
	// 	console.log('created user by createOne');
	// 	res.status(200).json({
	// 		message: 1,
	// 		response: createStatus,
	// 	});
	// }
	try {
		const model = database_models.users;
		const createStatus = await model.create({ name, email, mobile, password, roleId });
		console.log('created user by createOne');
		res.status(200).json({
			message: 1,
			response: createStatus,
		});
	} catch (error) {
		console.error('Error while creating user, ', error);
		res.status(500).json({
			message: 1,
			response: error,
		});
	}
};

export { findAll, createOne };
