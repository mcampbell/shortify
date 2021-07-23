import * as service from '../service/shortener.service';
import { NextFunction, Request, Response } from 'express';

export async function shorten(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!body?.url) {
        res.status(400).send({
            errors: [
                {
                    status: '400',
                    detail: 'missing required body parameter `url`',
                },
            ],
        });
        return;
    }

    // Some crude validation that this is a valid-ish url.  The spec for this is quite enormous, and the requirements
    // doc was open ended as to what it wanted to consider valid.  For our use, we will check that the URL class can
    // consume it, and that it has a protocol (new URL() looks like it requires one)
    const url = body.url;
    try {
        new URL(url);
        const shortened: string = await service.shorten(body.url);
        res.status(200).send({
            data: {
                type: 'short',
                value: shortened,
            },
        });
    } catch (err) {
        res.status(422).send({
            errors: [
                {
                    status: '422',
                    detail: `URL [${url}] cannot be shortened. Reason: ${err.message}`,
                },
            ],
        });
    }
}
