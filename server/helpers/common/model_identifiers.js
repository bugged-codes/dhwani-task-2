import { database_models } from '../../configs/db_config.js';

const model_identifier = (req, res, next) => {
	switch (req.params.model) {
		case 'users':
			res.locals.model = database_models.users;
			break;
		case 'roles':
			res.locals.model = database_models.roles;
			break;
		default:
			res.redirect('/404');
	}

	next();
};

export { model_identifier };
