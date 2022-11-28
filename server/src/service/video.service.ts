import Video, { VideoModel } from '../models/video.model'

export async function createVideo(id: string, input: VideoModel) {
    try {
        return await new Video({ ...input, userId: id })
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function update(idVideo: string, idUser: string, input: VideoModel) {
    try {
        const video = await Video.findById(idVideo)
        if (!video) {
            throw new Error('Video not found!')
        }
        if (idUser === video.userId) {
            return Video.findByIdAndUpdate(
                idVideo,
                {
                    $set: input,
                },
                {
                    new: true,
                }
            )
        } else {
            throw new Error('You can update only your video!')
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function deleteVid(idVideo: string, idUser: string) {
    try {
        const video = await Video.findById(idVideo)
        if (!video) {
            throw new Error('Video not found!')
        }
        if (idUser === video.userId) {
            return Video.findByIdAndDelete(idVideo)
        } else {
            throw new Error('You can update only your video!')
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function getVid(id: string) {
    return Video.findById(id)
}

export async function addViewVid(id: string) {
    return Video.findByIdAndUpdate(id, {
        $inc: { views: 1 },
    })
}
