const express = require('express');
const router = express.Router();

/**
 * /health/
 */

router.get('/', (req, res, next) => {
    const health = { db: 'ok', app: 'ok' };

    res.status(200).send(health);
});

module.exports = router;