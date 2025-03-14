import { Request, Response } from "express";

// Middleware for the Express app that controls who can make a request from the server
export default function accessPolicy(req: Request, res: Response, next: Function) {
    if (
        import.meta.env.VITE_FRONTEND === req.get('Referrer') ||
        import.meta.env.VITE_FRONTEND + '/' === req.get('Referrer')) {
        // Allow requests referred by the backend to proceed
        next();
    } else {
        // Disallow non-referred/direct requests
        res.sendStatus(403)
    }
    /* IPs can be whitelisted instead of checking for referrers.  req.ip returns an IPv6
    address like ::ffff:172.18.0.1 */
}