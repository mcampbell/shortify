import { EntityNotFoundError } from 'typeorm';
import { initializeDB } from './db';
import { NextFunction, Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const app = express();

/**
 * config, setup
 */

app.use(cors());
app.use(express.json());

/**
 * lazy init the db before we set up the routes which might use it.
 */
let dbInitialized: boolean = false;
app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!dbInitialized) {
        dbInitialized = true;
        await initializeDB();
    }
    next();
});

/**
 * Routes
 */

app.use('/health', require('./api/health.api'));
app.use('/shorten', require('./api/shorten.api'));
app.use('/', require('./api/redirect.api'));

/**
 * handle any endpoints that haven't been specified as a 404.
 */
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        errors: [
            {
                status: '404',
                detail: `unknown_endpoint: ${req.method}: ${req.url}`,
            },
        ],
    });
});

/**
 * Error-handling middleware, so our routes and other middleware can just next(e) with errors
 * that they can't or don't want to handle specifically, and
 * we can handle them all in one spot based on some Error hierarchy.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if (err instanceof EntityNotFoundError) {
            res.status(404).send({
                errors: [
                    {
                        status: '404',
                        details: err,
                    },
                ],
            });
        } else {
            res.status(500).send({
                errors: [
                    {
                        status: '500',
                        detail: err,
                    },
                ],
            });
        }
    }
});

/**
 * execution
 */
const PORT = 5001;
app.listen(5001, () => {
    console.log(`\nStarted on ${PORT} at ${new Date()}`);
});
