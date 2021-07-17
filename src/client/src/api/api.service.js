/**
 * Entrypoint to API calls.  In general I'd have multiple of these, per region/domain/context.  This allows me
 * to modify the aspects of the calls per logical unit, eg: a different baseURL, headers, etc.
 */

import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000'
});

/**
 * Shorten the URL.
 * @param url.  Required.
 * @return {Promise<{data, status: string}|{error, status: string}>}
 */
export async function shortenURL(url) {
    try {
        if (!url) {
            throw new Error('Missing required `url` parameter.');
        }
        const res = await http.post(`/shorten`, { url });
        return { status: 'success', data: res.data.url };
    } catch (error) {
        return { status: 'error', error };
    }
};
