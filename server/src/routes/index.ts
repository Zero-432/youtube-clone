import { Express, Request, Response } from 'express'
import authRoutes from './auth'

function routes(app: Express) {
    /** Healthcheck */
    app.get('/healthcheck', (req: Request, res: Response) => res.status(200).json({ hello: 'world' }))
    /** Authentication */
    app.use('/api/auth', authRoutes)
}

export default routes
