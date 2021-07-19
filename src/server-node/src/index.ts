import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { createConnection } from 'typeorm';

const express = require('express');
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

/**
 * Routes
 */

app.use('/health', require('./api/health'));
app.use('/shorten', require('./api/shorten.api'));


/**
 * execution
 */

const PORT = 5001;
app.listen(5001, () => {
    console.log(`\nStarted on ${PORT} at ${new Date()}`);
});
