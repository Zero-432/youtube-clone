import { Express, Request, Response } from 'express'

function routes(app: Express) {
    /** Healthcheck */
    app.get('/healthcheck', (req: Request, res: Response) => res.status(200).json({ hello: 'world' }))
}

export default routes
