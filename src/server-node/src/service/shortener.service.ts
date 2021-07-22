import { URLMappings } from '../entity/urlmappings.model';
import { createHash } from 'crypto';
import * as repository from '../repository/URLMappings';

const DEFAULT_SIZE = 7;

export interface Result {
    status: 'ok' | 'error',
    result: string
}

/**
 * Return a shortened mapping from a url.  If it already exists just return it, otherwise
 * create a new one and return it for future use.
 * @param url
 */
export async function shorten(url: string): Promise<Result> {
    // For the sake of consistency, we'll leave case alone. Also, trailing "/" matters, sometimes, but we don't have
    // a hard requirement to return the same shortening for the LOGICALLY same URL's, so we won't mess with them.
    // In other words, if https://foo.com/ and HTTPS://Foo.Com are sent, they'll get different shortenings, but
    // that doesn't matter; we redirect to the original URL and if they're the same thing, they'll go to the same
    // place.
    const found: URLMappings | undefined = await repository.getByUrl(url);

    try {
        if (found) {
            return { status: 'ok', result: found.shortened };
        } else {
            return { status: 'ok', result: await createNewShortening(url) };
        }
    } catch (e) {
        return { status: 'error', result: e.message };
    }
}

/**
 * Lookup the original URL based on the shortened one.  If it's not there, indicate that too.
 */
export async function expanden(shortened: string): Promise<Result> {
    const found: URLMappings | undefined = await repository.getByShortened(shortened);

    if (found) {
        return { status: 'ok', result: found.url };
    } else {
        return { status: 'error', result: 'not found' };
    }
}

/**
 * create a new url mapping/shortening for a url; this does all of create, store, and return the value.
 *
 * @param url
 */
async function createNewShortening(url: string): Promise<string> {
    // create a shortening, see if it exists already in the db and keep trying until we get one that doesn't.
    let salt: number = 1;
    while (true) {
        const candidateShort: string = hashAndEncode(`${salt}${url}`);
        const found: URLMappings | undefined = await repository.getByShortened(candidateShort);

        if (!found) {
            // Not already there, so insert it
            const mapping = new URLMappings(url, candidateShort);
            await repository.save(mapping);
            return candidateShort;
        } else {
            // We used this one already, create a new one by changing the salt and re-hashing/encoding/etc
            salt += 1;
        }
    }
}

/**
 * create a hash of the candidate url, and encode it to base64.  Then take the first 'n' characters.
 * This should be relatively well distributed across the domain space of approximately [A-Za-z0-9]*.
 *
 * @param candidate url to hash
 * @param size output size in characters
 */
function hashAndEncode(candidate: string, size: number = DEFAULT_SIZE): string {
    const hash = createHash('sha256');
    hash.update(candidate);

    const hashBuffer: Buffer = hash.digest();
    const encoded = hashBuffer.toString('base64');

    return encoded.substring(0, size > 0 ? size : DEFAULT_SIZE);
}

