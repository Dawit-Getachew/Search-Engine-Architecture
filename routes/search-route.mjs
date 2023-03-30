import express from 'express';
import { searchFunction, sortResult, translateLanguage } from '../controllers/search-controller.mjs';

const router = express.Router()



router.route('/').get(searchFunction);
router.route('/sort').get(sortResult);
router.route('/translate').get(translateLanguage);

export default router