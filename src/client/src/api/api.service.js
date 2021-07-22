/**
 * Entrypoint to API calls.  In general I'd have multiple of these, per region/domain/context.  This allows me
 * to modify the aspects of the calls per logical unit, eg: a different baseURL, headers, etc.
 */

import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5001'
});

/**
 * Shorten the URL.
 *
 * Note to reviewer: I want this to be RESTy, but it's so very much a "command" type action; I'm kind of
 * struggling what the right URI should be; what's the 'resource', and what action are we doing to/on
 * it?
 *
 * In my current position I have one of these api.service.js files devoted specifically to non-REST
 * endpoints, though they are few.
 *
 * @param url.  Required.
 * @return {Promise<{data, status: string}|{error, status: string}>}
 */
export async function shortenURL(url) {
    try {
        if (!url) {
            throw new Error('Missing required `url` parameter.');
        }
        const res = await http.post(`/shorten`, { url });
        if (res?.data?.data?.status === 'ok') {
            return { status: 'success', data: res.data.data.result };
        } else {
            return { status: 'error', error: res.data.data.result };
        }

    } catch (error) {
        return { status: 'error', error };
    }
}
