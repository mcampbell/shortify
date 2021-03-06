import * as controller from '../controller/redirect.controller';

const express = require('express');
const router = express.Router();

/**
 * /
 *
 * We specifically are not requiring auth on this.
 */
router.get(/.*/, controller.redirect);

module.exports = router;
