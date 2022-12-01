import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { addViewVid, createVideo, deleteVid, getVid, randomVideo, searchVideo, subVideo, tagVideo, trendVideo, update } from '../service/video.service'
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

export const updateVideo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const updatedVideo = await update(req.params.id, req.user?.id, req.body)
        res.status(200).json(updatedVideo)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const deleteVideo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        await deleteVid(req.params.id, req.user?.id)
        res.status(200).json('The video has been deleted.')
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const getVideo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const video = await getVid(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const addView = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        await addViewVid(req.params.id)
        res.status(200).json('The view has been increased.')
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const random = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const videos = await randomVideo()
        res.status(200).json(videos)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const trend = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const videos = await trendVideo()
        res.status(200).json(videos)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const sub = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const listSubscribedVideos = await subVideo(req.user?.id)
        res.status(200).json(listSubscribedVideos.flat().sort((a: any, b: any) => b.createdAt - a.createdAt))
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const getByTag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const videos = await tagVideo(req.query.tags as string)
        res.status(200).json(videos)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}

export const search = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const videos = await searchVideo(req.query.q as string)
        res.status(200).json(videos)
    } catch (err) {
        Logging.error(err)
        Error(err, res)
    }
}
