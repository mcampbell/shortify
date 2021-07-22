import * as controller from '../controller/redirect.controller';

const express = require('express');
const router = express.Router();

/**
 * /
 */
router.get(/.*/, controller.redirect);

module.exports = router;
