import { mappingCount } from '../repository/URLMappings';
import { NextFunction, Request, Response } from 'express';

const express = require('express');
const router = express.Router();

/**
 * /health/
 */

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // Skipping the controller and service layer here, for expediency.  I normally would not.
    try {
        const count: number = await mappingCount();
        const health = { db: count > 0 ? 'ok' : 'notok', app: 'ok' };
        res.status(200).send(health);
    } catch (e) {
        const health = { db: 'notok', app: 'ok' };
        res.status(200).send(health);
    }
});

module.exports = router;
