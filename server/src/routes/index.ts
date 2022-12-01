import { Express, Request, Response } from 'express'
import authRoutes from './auth'
import userRoutes from './users'
import videoRoutes from './videos'
import commentRoutes from './comments'

function routes(app: Express) {
    /** Healthcheck */
    app.get('/healthcheck', (req: Request, res: Response) => res.status(200).json({ hello: 'world' }))
    /** Authentication */
    app.use('/api/auth', authRoutes)
    app.use('/api/users', userRoutes)
    /** Video */
    app.use('/api/videos', videoRoutes)
    /** Commnents */
    app.use('/api/comments', commentRoutes)
}

export default routes
