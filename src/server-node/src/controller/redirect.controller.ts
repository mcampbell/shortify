import { expanden } from '../service/shortener.service';
import { EntityNotFoundError } from 'typeorm';

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
    const input: string = String(req.originalUrl);

    // The / character is a valid character in the shortened input, but we remove the first one (but only the first!)
    // here since it comes along for the ride as req.originalUrl.
    const shortened = input.startsWith('/') ? input.substring(1) : input;
    try {
        const lookup: string = await expanden(shortened);
        res.redirect(lookup);
    } catch (e) {
        // handle this controller specific, expected case.
        if (e instanceof EntityNotFoundError) {
            res.status(404).send({
                errors: [
                    {
                        status: '404',
                        detail: `No expansion of ${shortened} can be found.`
                    }
                ]
            });
        } else {
            next(e);
        }
    }
}