import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { createUser, login } from '../service/auth.service'
import Error from '../utils/Error'

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newUser = await createUser(req.body)
        await newUser.save()
        res.status(200).send('User has been created!')
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { email, password } = req.body
        const { token, dataUser } = await login(email, password)

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(dataUser)
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}
