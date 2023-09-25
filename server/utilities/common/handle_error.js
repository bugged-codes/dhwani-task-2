/**
 * The `handleError` function is used to format and extract error messages from different types of
 * errors in JavaScript, particularly for Sequelize database errors.
 * @param err - The `err` parameter is an error object that contains information about the error that
 * occurred. It may have properties such as `message`, `name`, and `errors`.
 * @returns The function `handleError` returns the error message with custom error message.
 */
const handleError = (err) => {
	let msg = err.message;
	console.log('from utilities/common/handle_errors.js: ', err);
	if (err && err.errors) {
		if (err.name) {
			switch (err.name) {
				case 'SequelizeUniqueConstraintError':
					const field = err['errors'][0]['path'].split('_').join(' ');
					if (field) {
						let str = field.split('_').join(' ');

						let label = str.charAt(0).toUpperCase() + str.slice(1);

						msg = `${label} already exists!`;
					} else {
						msg = 'Already exists!';
					}
			}
		} else if (err.errors.length > 0 && err.errors[0]['value'] == 'Validation error') {
			msg = err.errors[0]['message'];
		} else {
			msg = err.message;
		}
	}
	return msg;
};

/* error object: 
errors [
	ValidationErrorItem  {
		message: 'Mobile number already has an account!',
		type: 'Validation error',
		path: 'mobile',
		value: '1234567893',
		origin: 'FUNCTION',
		instance: [users],
		validatorKey: 'customValidator',
		validatorName: null,
		validatorArgs: [],
		original: 'Mobile number already has an account!',
	},
];
*/
export default handleError;
