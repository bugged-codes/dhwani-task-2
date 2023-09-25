//  config and connection file for connecting with postgre db with sequalize

import { readdirSync } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config.js';
import { log4connections } from './responses.js';
// destructuring the private variables provided as environment variables.
const { _DB_NAME, _DB_USER, _DB_PASSWORD, _DB_DIALECT, _DB_HOST } = process.env;

// variables
const database_models = {};
const __filename = fileURLToPath(import.meta.url);
console.log('__filename is==> ', __filename);
const __dirname = path.resolve(path.dirname(__filename));
console.log('__dirname is==> ', __dirname);

// creating a new sequelize instance
const sequelize_instance = new Sequelize(_DB_NAME, _DB_USER, _DB_PASSWORD, {
	host: _DB_HOST,
	dialect: _DB_DIALECT,
	logging: console.log,
});

//SECTION combining all `_model.js` files from ../models folder, to associate all those models which includes 'associate' in them at once.

readdirSync(path.join(__dirname, '../models'))
	.filter((file) => {
		// console.log('file array is :', file);
		// console.log('file basename: ', path.basename(file));
		// console.log('file that gets returned', file.indexOf('.') !== 0 && file === path.basename(file) && file.slice(-3) === '.js');
		if (file.indexOf('.') !== 0 && file === path.basename(file) && file.slice(-3) === '.js') return file;
	})
	.forEach((file) => {
		// console.log('file is : ', file);

		// ! tried absolute path, still importing fails
		// const modulePath = path.join(__dirname, '../models/' + file);

		import(`../models/${file}`)
			.then(({ default: module }) => {
				let a = module(sequelize_instance, DataTypes);
				a.sync({ alter: true })
					.then(() => console.log(`----->${a} module is synced with db.<-----`))
					.catch((err) => console.log('error while syncing: ', err));
				database_models[module.name] = module(sequelize_instance, DataTypes);
			})
			.catch((err) => console.log('error reading module files: ', err));

		// const { default: model } = await import(`../models/${file}`);
		// // const { default: model } = modelExport;
		// console.log('model is :====> ', model);
		// database_models[model.name] = model(sequelize_instance, DataTypes);
		// console.log('database_models :', database_models);
	});

// Creating a relationship between the tables.w
Object.keys(database_models).forEach((modelName) => {
	if (database_models[modelName].associate) {
		database_models[modelName].associate(database_models);
		console.log('Associated database_models: ', database_models);
	}
});

// !SECTION

// connecting and testing the connection to db mentioned in sequelize instance
// sequelize_instance
// 	.authenticate()
// 	.then(() => console.log(log4connections(true, 'database')))
// 	.catch(() => console.error(log4connections(false, 'database')));

// sequelize_instance
// 	.sync({ alter: true })
// 	.then(() => {
// 		console.log('sequelize_instance dictionary: ', sequelize_instance.models);
// 		console.log('user model: ', typeof sequelize_instance.model('users'));
// 		console.log('typeof: ', typeof database_models.users);
// 		// console.log('database_models: ', database_models.users(sequelize_instance, DataTypes));
// 		console.info(log4connections(true, 'models'));
// 	})
// 	.catch((err) => console.error(log4connections(false, 'models'), err));

export { database_models };
export default sequelize_instance;
