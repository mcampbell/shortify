import * as controller from '../controller/shorten.controller';

const express = require('express');
const router = express.Router();

/**
 * /shorten
 */
router.post('/', controller.shorten);

module.exports = router;
