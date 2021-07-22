import { expanden, Result } from '../service/shortener.service';

/**
 * Redirect to the found url if there is one, or an error explaining the issue if not.
 *
 * @param req
 * @param res
 * @param next
 */
export async function redirect(req: any, res: any, next: any) {
    // Get the interesting bit from the URI, which should be a shortened "normal" uri, look it up and redirect
    // if it exists.

    // If it doesn't, tell the user.
    const input: string = String(req.originalUrl)

    const shortened = input.startsWith('/') ? input.substring(1) : input;
    const lookup: Result = await expanden(shortened);
    if (lookup.status === 'ok') {
        res.redirect(lookup.result)
    } else {
        res.status(404).send(`The shortened URL ${input} unfortunately does not have a valid URL to redirect to.`)
    }
}