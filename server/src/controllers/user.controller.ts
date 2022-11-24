import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import Error from '../utils/Error'
import User from '../models/user.model'

export const update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.params.id === req.user?.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: req.body,
                },
                { new: true }
            )
            res.status(200).json(updatedUser)
        } catch (err: any) {
            Logging.error(err)
            Error(err, res)
        }
    } else {
        return next(Error({ status: 403, message: 'You can update only your account!' }, res))
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.params.id === req.user?.id) {
        try {
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json('User has been deleted.')
        } catch (err) {
            Logging.error(err)
            Error(err, res)
        }
    } else {
        return next(Error({ status: 403, message: 'You can delete only your account!' }, res))
    }
}
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
export const subscribe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        await User.findByIdAndUpdate(req.user?.id, {
            $push: { subscribedUsers: req.params.id },
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        })
        res.status(200).json('Subscription Successful!')
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
export const unsubscribe = (req: Request, res: Response, next: NextFunction) => {}
export const like = (req: Request, res: Response, next: NextFunction) => {}
export const dislike = (req: Request, res: Response, next: NextFunction) => {}
