import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { createUser } from '../service/auth.service'
import Error from '../utils/Error'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await createUser(req.body)
        await newUser.save()
        res.status(200).send('User has been created!')
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}
