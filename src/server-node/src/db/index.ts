/**
 * DB setup
 */
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { createConnection } from 'typeorm';
import { URLMappings } from '../entity/urlmappings.model';
import { getByUrl, save } from '../repository/URLMappings';

export async function initializeDB() {
    const options: SqliteConnectionOptions = {
        type: 'sqlite',
        database: './db/shortify.db',
        entities: ['./src/entity/**/*.model.ts'],
        synchronize: true,
        logging: 'all',
    };
    await createConnection(options);

    // Seed the database with 1 well-known record if its not already there.  This could be useful for testing.
    const oneWellKnownRecord = 'https://stord.com';
    const found: URLMappings | undefined = await getByUrl(oneWellKnownRecord);
    if (!found) {
        const seed = new URLMappings(oneWellKnownRecord, 'aaaaaa');
        await save(seed);
    }

    console.log('DB initialized');
}
