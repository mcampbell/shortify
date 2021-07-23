import * as service from '../service/shortener.service';

export async function shorten(req: any, resp: any, next: any) {
    const body = req.body;
    if (!body?.url) {
        resp.status(400).send({
            errors: [
                {
                    status: "400",
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
    } catch (err) {
        resp.status(422).send({
            errors: [
                {
                    status: "422",
                    detail: `URL [${url}] cannot be shortened. Reason: ${err.message}`,
                },
            ],
        });
    }

    try {
        const shortened: string = await service.shorten(body.url);
        resp.status(200).send({
            data: {
                type: 'short',
                value: shortened,
            },
        });
    } catch (err) {
        next(err);
    }
}
