/* Defining "district" model/schema for "districts" table/entity using sequelize instance */

// import { DataTypes } from "sequelize";
// import sequelize_instance from "../configs/db_config.js";

export default function districts(sequelize_instance, DataTypes) {
	const districts = sequelize_instance.define(
		'district',
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
			state_id: {
				type: DataTypes.INTEGER,
			},
		},
		{ tableName: 'districts' }
	);
	return districts;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

// const d = coordinators(sequelize_instance, DataTypes);
// d.sync({ force: true });
