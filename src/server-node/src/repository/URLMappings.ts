import { URLMappings } from '../entity/urlmappings.model';
import { getManager, getRepository } from 'typeorm';

export async function getByUrl(url: string): Promise<URLMappings | undefined> {
    return await getRepository(URLMappings).createQueryBuilder('mapping').where('url = :url', { url }).getOne();
}

export async function getByShortened(shortened: string): Promise<URLMappings | undefined> {
    return await getRepository(URLMappings)
        .createQueryBuilder('mapping')
        .where('shortened = :shortened', { shortened })
        .getOne();
}

export async function mappingCount(): Promise<number> {
    // There's probably a better way to do this in typeorm.
    const count = await getManager().query(`
        SELECT count(*) as count
        FROM url_mappings
    `);

    return (count?.length === 1 && count[0].count) || 0;
}

export async function save(mapping: URLMappings): Promise<URLMappings> {
    return await getRepository(URLMappings).save(mapping);
}
