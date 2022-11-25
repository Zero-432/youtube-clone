import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { createVideo } from '../service/video.service'
import Error from '../utils/Error'

export const addVideo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newVideo = await createVideo(req.user?.id, req.body)
        await newVideo.save()
        res.status(200).json(newVideo)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
