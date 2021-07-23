import * as controller from '../controller/shorten.controller';
import { isAuthed } from '../middleware/authentication';

const express = require('express');
const router = express.Router();

/**
 * /shorten
 */
router.use(isAuthed);
router.post('/', controller.shorten);

module.exports = router;
