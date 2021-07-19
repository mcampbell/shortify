export async function shorten(req: any, resp: any, next: any) {
    const body: { url: string } = req.body;
    if (!body?.url) {
        resp.status(400).send({
            status: 'error',
            data: { reason: 'missing required body parameter `url`' },
        });
    }
    try {
    } catch (err) {
        next(err);
    }
}
