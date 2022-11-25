import Video, { VideoModel } from '../models/video.model'

export async function createVideo(id: string, input: VideoModel) {
    try {
        const newVideo = await new Video({ ...input, userId: id })
        return newVideo
    } catch (err: any) {
        throw new Error(err.message)
    }
}
