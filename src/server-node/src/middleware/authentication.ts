import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to check very simple, very bad, authentication.
 *
 */

/**
 * Normally this value would be something we verify in some secure way rather than
 * a hardcoded value that anyone who knows it can spoof.
 */
export async function isAuthed(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get('Authentication');

    if (authHeader) {
        const [, token] = authHeader.split(/\s+/);
        if (!securelyVerifyToken(token /*, ... */)) {
            res.status(401).end();
        } else {
            next();
        }
    } else {
        res.status(401).end();
    }
}

function securelyVerifyToken(token: string /* possible other parameters */): boolean {
    const magicToken = 'JWTGOESHERE';

    return token === magicToken;
}
