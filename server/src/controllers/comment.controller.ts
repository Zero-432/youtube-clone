import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { add, delComment, getCmt } from '../service/comment.service'
import Error from '../utils/Error'

export const addComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newComment = await add(req.user?.id, req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        await delComment(req.params.id, req.user?.id)
        res.status(200).json('The comment has been deleted.')
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}

export const getComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const comments = await getCmt(req.params.videoId)
        res.status(200).json(comments)
    } catch (err: any) {
        Logging.error(err)
        Error(err, res)
    }
}
