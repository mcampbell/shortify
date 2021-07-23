import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { createConnection, EntityNotFoundError } from 'typeorm';

const express = require('express');
const cors = require('cors');
const app = express();

/**
 * config, setup
 */

const options: SqliteConnectionOptions = {
    type: 'sqlite',
    database: './db/shortify.db',
    entities: ['./src/entity/**/*.model.ts'],
    synchronize: false,
    logging: 'all',
};
createConnection(options);

app.use(cors());
app.use(express.json());

/**
 * Routes
 */

app.use('/health', require('./api/health.api'));
app.use('/shorten', require('./api/shorten.api'));
app.use('/', require('./api/redirect.api'));

/**
 * handle any endpoints that haven't been specified as a 404.
 */
app.all('*', (req: any, res: any) => {
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
app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof EntityNotFoundError) {
        res.status(404).send({
            errors: [
                {
                    status: '404',
                    details: err
                }
            ]
        });

    }
    res.status(500).send({
        errors: [
            {
                status: '500',
                detail: err
            }
        ]
    });
});

/**
 * execution
 */
const PORT = 5001;
app.listen(5001, () => {
    console.log(`\nStarted on ${PORT} at ${new Date()}`);
});
