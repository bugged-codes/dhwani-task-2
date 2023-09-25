/* Defining "state" model/schema for "states" table/entity using sequelize instance */

import { DataTypes } from 'sequelize';
import sequelize_instance from '../configs/db_config.js';

export default function roles(sequelize_instance, DataTypes) {
	const roles = sequelize_instance.define(
		'roles',
		{
			id: {
				type: DataTypes.INTEGER,
				defaultValue: Number(0),
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				defaultValue: 'user',
				allowNull: false,
			},
		},
		{
			tableName: 'roles',
		}
	);
	return roles;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

const r = coordinators(sequelize_instance, DataTypes);
r.sync({ force: true });
