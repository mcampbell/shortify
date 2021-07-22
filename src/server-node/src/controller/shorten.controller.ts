import * as service from '../service/shortener.service';
import { Result } from '../service/shortener.service';

export async function shorten(req: any, resp: any, next: any) {
    const body = req.body;
    if (!body?.url) {
        resp.status(400).send({
            status: 'error',
            data: { reason: 'missing required body parameter `url`' },
        });
        return;
    }

    // Some crude validation that this is a valid-ish url.  The spec for this is quite enormous, and the requirements
    // doc was open ended as to what it wanted to consider valid.  For our use, we will check that the URL class can
    // consume it, and that it has a protocol (new URL() looks like it requires one)
    const url = body.url;
    try {
        new URL(url);
    } catch (err) {
        resp.status(422).send({
            status: 'error',
            data: { reason: `url ${url} appears to not be a valid url.  Reason: ${err.message}` },
        });
    }

    try {
        const shortened: Result = await service.shorten(body.url);
        if (shortened.status === 'ok') {
            resp.status(200).send({
                status: 'success',
                data: shortened,
            });
        } else {
            next(shortened.result);
        }
    } catch (err) {
        next(err);
    }
}
