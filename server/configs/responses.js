// file containing pre-configured messages to be used for logging, action response etc.

const noArgPassed = 'Arguments to log statement not passed.';

/**
 * Common logging helper function
 *
 * The `connections` function is a helper function that is used to generate log
 * messages for testing connections.
 * It takes in two parameters: `isSuccess` and `onWhat`.
 *
 * @param isSuccess - Boolean value to be passed to determine success or failure.
 *
 * @param onWhat - A string value to be passed te describe on what action the
 * response should be success or failure.
 */
export const log4connections = (isSuccess, onWhat) => {
	if (isSuccess && onWhat) {
		const status = isSuccess == true ? 'successful' : 'failed';

		if (onWhat === ('models' || 'model')) {
			return `${onWhat} syncing to database ${status}`;
		} else {
			return `Connection ${status} to ${onWhat}`;
		}
	} else {
		return noArgPassed;
	}
};

/**
 * Common logging helper function
 *
 * The `express` function is a pre-configured message that is used for logging
 * the start of an Express server.
 *
 * @param port - port on which express server is listening,
 * default is 8080
 *
 * @param protocol - protocol using which the server is accepting connections,
 * default is "http"
 *
 * @param host - url address on which server is running,
 * default is "localhost"
 **/
export const log4express = (port = 8080, protocol = 'http', host = '127.0.0.1') => `Express server started on port: ${port}\n@ ${protocol}://${host}:${port}`;

/**
 * Common CRUD operations logging helper function
 *
 * The `crud` function is a pre-configured message that is used for logging
 * CRUD (Create, Read, Update, Delete) operations.
 * @param isSuccess - Boolean value to be passed to determine success or failure.
 *
 * @param onWhat - Name of the model or table on which the operation is performed,
 * default value is "database table"
 *
 * @param operation - Name of the operation in verb+ing form that was performed.
 * example - "creating", "updating"
 **/
export const log4crud = (isSuccess, onWhat, operation) => {
	if (isSuccess && operation) {
		const status = isSuccess == true ? 'successful' : 'failed';
		const commonString = `data from ${onWhat || 'database table'}`;
		if (operation === 'creating') {
			return `${status} ${operation} data into ${onWhat || 'database table'}.`;
		} else {
			return `${status} while ${operation} ${commonString}`;
		}
	} else {
		return noArgPassed;
	}
};

/**
 * The log4json function logs a JSON object with success status, message, response, and timestamp.
 * @param isSuccess - A boolean value indicating whether the operation was successful or not.
 * @param message - The `message` parameter is a string that represents a specific message or code. It
 * is used to determine the value of the `message` property in the returned object.
 * @param response - The `response` parameter is an object that contains two properties: `message` and
 * `values`.
 * @returns The function `log4json` returns an object with the following properties:
 */
export const log4json = (isSuccess, message, response) => {
	const timestamp = new Date().toISOString();
	if (isSuccess && response) {
		if (message) {
			switch (message) {
				case '1':
					message = '1';
					break;
				default:
					message = 'default';
					break;
			}
			return {
				success: isSuccess,
				message: message,
				response: {
					message: response.message || 'no message provided by the server',
					values: response.values || 'no values provided by the server',
				},
				timestamp,
			};
		} else {
			return {
				success: isSuccess,
				message: message,
				response: {
					message: 'no message provided from server',
					values: 'no values provided from server',
				},
				timestamp,
			};
		}
	} else {
		return noArgPassed;
	}
};

/**
 * Common model validations logging helper function
 *
 * The `modelValidations` function is a pre-configured message that is used for logging
 * custom messages when validation conditions defined in models fail.
 * @param field - Name of the field/column in string on which validation is applied.
 * e.g. "email","name"
 *
 * @param value - Must be `this.value`, the value that is causing validation to fail
 **/
export const modelValidations = (field, value) => {
	const capitalizedValue = String(value).charAt(0).toUpperCase();
	return `${capitalizedValue} is not a valid ${field}, please enter a valid ${field}`;
};
