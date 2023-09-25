/* Defining "household" model/schema for "households" table/entity using sequelize instance */

// import { DataTypes } from 'sequelize';
// import sequelize_instance from '../configs/db_config.js';
import { modelValidations } from '../configs/responses.js';

export default function households(sequelize_instance, DataTypes) {
	const households = sequelize_instance.define(
		'household',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			mobile: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: (val) => modelValidations('email', val),
				},
				allowNull: true,
			},
			aadhar: {
				type: DataTypes.STRING(12),
				allowNull: false,
			},
			address: {
				type: DataTypes.TEXT,
			},
			family_members_count: {
				type: DataTypes.INTEGER,
			},
			village_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ tableName: 'households' }
	);
	return households;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

// const h = coordinators(sequelize_instance, DataTypes);
// h.sync({ force: true });
