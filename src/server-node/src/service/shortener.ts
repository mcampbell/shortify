import { getRepository } from 'typeorm';
import { URLMappings } from '../entity/urlmappings.model';
import { createHash } from 'crypto';

const DEFAULT_SIZE = 7;


/**
 * Return a shortened mapping from a url.  If it already exists just return it, otherwise
 * create a new one and return it for future use.
 * @param url
 */
export async function shorten(url: string): Promise<string> {
    const found: URLMappings | undefined = await getRepository(URLMappings)
        .createQueryBuilder('map')
        .where('url = :url', { url: url.toLowerCase() })
        .getOne();

    if (found) {
        return found.shortened;
    } else {
        return '';
    }
}

/**
 * create a new url mapping/shortening for a url; this does all of create, store, and return the value.
 *
 * @param url
 */
async function createNewShortening(url: string): Promise<string> {
    // create a shortening, see if it exists already in the db and keep trying until we get one that doesn't.
    return '';
}

/**
 * create a hash of the candidate url, and encode it to base64.  Then take the first 'n' characters.
 * This should be relatively well distributed across the domain space.
 *
 * @param candidate url to hash
 * @param size output size in characters
 */
async function hashAndEncode(
    candidate: string,
    size: number = DEFAULT_SIZE
): Promise<string> {
    const hash = createHash('sha256');
    hash.update(candidate);

    const hashBuffer: Buffer = hash.digest();
    const encoded = hashBuffer.toString('base64');

    return encoded.substring(0, size > 0 ? size : DEFAULT_SIZE);
}
