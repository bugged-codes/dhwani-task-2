/* Defining "district" model/schema for "districts" table/entity using sequelize instance */

import { DataTypes } from 'sequelize';
import sequelize_instance from '../configs/db_config.js';

export default function coordinators(sequelize_instance, DataTypes) {
	const coordinators = sequelize_instance.define(
		'coordinator',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			state_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			district_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			village_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{ tableName: 'coordinators' }
	);

	// hook function that will be executed before saving a new instance of the coordinator` model to the database when create or update is used.
	coordinators.beforeSave('checkNotNull', async (coordinator, options) => {
		// Check if all three columns (state, district, and village) are not null, if they are then throw error that will be sent back before saving the data to database.
		if (
			(Boolean(coordinator.getDataValue('state_id')) === true && Boolean(coordinator.getDataValue('district_id')) === true) ||
			(Boolean(coordinator.getDataValue('state_id')) === true && Boolean(coordinator.getDataValue('village_id')) === true) ||
			(Boolean(coordinator.getDataValue('village_id')) === true && Boolean(coordinator.getDataValue('district_id')) === true) ||
			(coordinator.getDataValue('state_id') === null && coordinator.getDataValue('district_id') === null && coordinator.getDataValue('village_id') === null)
		) {
			throw new Error('Exactly one of state, district, or village should have a value');
		}
	});
	return coordinators;
}

const c = coordinators(sequelize_instance, DataTypes);
c.sync({ force: true });
