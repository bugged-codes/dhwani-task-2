// common file for routes

import { Router } from 'express';
import { rawSelectAll, rawCreateOne } from '../controllers/db_operations_using_rawQueries.js';
import { createOne, findAll } from '../controllers/db_operations.js';
import { log4json } from '../configs/responses.js';
import { model_identifier } from '../helpers/common/model_identifiers.js';
import { createOrUpdate } from '../services/common_crud_service.js';

const router = Router();

// route performing raw-sql query to show all data.
router.get('/db/raw/find-all', rawSelectAll);
router.post('/db/raw/create-one', rawCreateOne);

router.get('/db/find-all', findAll);
router.post('/db/create-one', createOne);

router.post('/db/create/:model', model_identifier, createOrUpdate);

router.all('*', (req, res) => {
	res.status(404).json(log4json(true, "Page you are looking for doesn't exists", { message: 'no message' }));
});

export default router;
