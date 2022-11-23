import { Express, Request, Response } from 'express'
import authRoutes from './auth'
import userRoutes from './users'

function routes(app: Express) {
    /** Healthcheck */
    app.get('/healthcheck', (req: Request, res: Response) => res.status(200).json({ hello: 'world' }))
    /** Authentication */
    app.use('/api/auth', authRoutes)
    app.use('/api/users', userRoutes)
}

export default routes
