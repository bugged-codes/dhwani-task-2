/* Defining "state" model/schema for "states" table/entity using sequelize instance */

// import { DataTypes } from "sequelize";
// import sequelize_instance from "../configs/db_config.js";

export default function states(sequelize_instance, DataTypes) {
	const state = sequelize_instance.define(
		'state',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: false,
			},
		},
		{ tableName: 'states' }
	);
	return state;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

// const d = coordinators(sequelize_instance, DataTypes);
// d.sync({ force: true });
