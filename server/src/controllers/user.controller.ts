import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import Error from '../utils/Error'
import User from '../models/user.model'
import { deleteUser, getUser, subscribeUser, unsubscribeUser, updateUser } from '../service/user.service'

export const update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.params.id === req.user?.id) {
        try {
            const updatedUser = await updateUser(req.user.id, req.body)
            res.status(200).json(updatedUser)
        } catch (err: any) {
            Logging.error(err)
            Error(err, res)
        }
    } else {
        return next(Error({ status: 403, message: 'You can update only your account!' }, res))
    }
}

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.params.id === req.user?.id) {
        try {
            await deleteUser(req.user.id)
            res.status(200).json('User has been deleted.')
        } catch (err) {
            Logging.error(err)
            Error(err, res)
        }
    } else {
        return next(Error({ status: 403, message: 'You can delete only your account!' }, res))
    }
}
export const getUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const user = await getUser(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
export const subscribe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const subscribeObj = await subscribeUser(req.user?.id, req.params.id)
        await subscribeObj.subscribeUser
        await subscribeObj.subscriber
        res.status(200).json('Subscription Successful!')
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
export const unsubscribe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unsubscribeObj = await unsubscribeUser(req.user?.id, req.params.id)
        await unsubscribeObj.subscribeUser
        await unsubscribeObj.subscriber
        res.status(200).json('Unsubscription Successful!')
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
export const like = (req: Request, res: Response, next: NextFunction) => {}
export const dislike = (req: Request, res: Response, next: NextFunction) => {}
