import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Error from './Error'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')
    const tokenConvert = token?.replace('Bearer ', '')
    if (!tokenConvert) return next(Error({ status: 401, message: 'You are not authenticated!' }, res))

    jwt.verify(tokenConvert, process.env.JWT_SECRET as jwt.Secret, (err: any, user: any) => {
        if (err) return next(Error({ status: 403, message: 'Token is not valid!' }, res))
        req.user = user
        next()
    })
}
