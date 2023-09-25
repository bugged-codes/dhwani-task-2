/* defining a Sequelize model for an "user" entity in a JavaScript file. */

// import { DataTypes } from 'sequelize';
// import sequelize_instance from '../configs/db_config.js';
import { modelValidations } from '../configs/responses.js';

export default function users(sequelize_instance, Datatypes) {
	const user = sequelize_instance.define(
		'user',
		{
			id: {
				type: Datatypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Datatypes.STRING,
				allowNull: false,
				validate: {
					convert2LowerCase(val) {
						return String.prototype.toLowerCase(val);
					},
				},
			},
			email: {
				type: Datatypes.STRING,
				allowNull: false,
				validate: {
					isEmail: (val) => modelValidations('email', val),
				},
			},
			mobile: {
				type: Datatypes.STRING(10),
				allowNull: false,
				validate: {
					async validateExistingMobile(val, next) {
						try {
							const searchResult = await user.findOne({
								where: {
									mobile: val,
								},
							});
							console.log('searchResult is: ', searchResult);
							if (searchResult) {
								throw new Error('Account with same mobile number exists');
							}
							next();
						} catch (error) {
							return next(error);
						}
					},
				},
			},
			password: {
				type: Datatypes.STRING,
				allowNull: false,
			},
			roleId: {
				type: Datatypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{ tableName: 'users' }
	);
	return user;
}

// NOTE - following code is to be used only when this single model needs to be synced forcefully i.e. deleting previous table created by this model and creating a new table by using this model, keep it commented when not in use.

// const u = coordinators(sequelize_instance, DataTypes);
// u.sync({ force: true });
