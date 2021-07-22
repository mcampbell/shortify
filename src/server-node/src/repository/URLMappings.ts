import { URLMappings } from '../entity/urlmappings.model';
import { getRepository } from 'typeorm';

export async function getByUrl(url: string): Promise<URLMappings | undefined> {
    return await getRepository(URLMappings)
        .createQueryBuilder('mapping')
        .where('url = :url', { url })
        .getOne();
}

export async function getByShortened(shortened: string): Promise<URLMappings | undefined> {
    return await getRepository(URLMappings)
        .createQueryBuilder('mapping')
        .where('shortened = :shortened', { shortened })
        .getOne();
}

export async function save(mapping: URLMappings): Promise<URLMappings> {
    return await getRepository(URLMappings).save(mapping);
}