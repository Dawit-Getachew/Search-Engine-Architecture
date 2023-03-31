import express from 'express';
import { searchFunction, sortResult, translateLanguage } from '../controllers/search-controller.mjs';

const router = express.Router()



router.route('/').post(searchFunction).get(searchFunction);
router.route('/sort').post(sortResult).get(sortResult)
router.route('/translate').post(translateLanguage).get(translateLanguage);

export default router