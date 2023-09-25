/* Defining "village" model/schema for "villages" table/entity using sequelize instance */

import { DataTypes } from 'sequelize';
import sequelize_instance from '../configs/db_config.js';

export default function villages(sequelize_instance, DataTypes) {
	const villages = sequelize_instance.define(
		'village',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: false,
			},
			district_id: {
				type: DataTypes.INTEGER,
			},
		},
		{ tableName: 'villages' }
	);
	return villages;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

// const v = coordinators(sequelize_instance, DataTypes);
// v.sync({ force: true });
