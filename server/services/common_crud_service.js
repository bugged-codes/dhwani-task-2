import { log4json } from '../configs/responses.js';
import handleError from '../utilities/common/handle_error.js';

const createOrUpdate = async (req, res, next) => {
	const { name, email, mobile } = req.body;
	const model = res.locals.model;
	console.log('model from res.locals.model: ', model);
	try {
		const existingData = await model.findOne({
			where: { email },
		});

		if (existingData) {
			const updatedData = await existingData.update({ name, email, mobile });
			res.status(200).json({
				status: true,
				message: `successfully updated data from ${model}`,
				response: updatedData,
			});
		} else {
			const createdData = await model.create({ name, email, mobile });
			res.status(200).json({
				status: true,
				message: `successfully created data in ${model}`,
				response: createdData,
			});
		}
	} catch (error) {
		const customErrMsg = handleError(error);
		res.status(500).json({
			status: false,
			message: customErrMsg,
			response: error,
		});
	}
	next();
};

export { createOrUpdate };
