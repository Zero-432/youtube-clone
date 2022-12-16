import Video, { VideoModel } from '../models/video.model'
import User from '../models/user.model'

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

export async function randomVideo() {
    return Video.aggregate([{ $sample: { size: 40 } }])
}

export async function trendVideo() {
    return Video.find().sort({ views: -1 })
}

export async function subVideo(idUser: string) {
    try {
        const user = await User.findById(idUser)
        const subscribedChannels = user?.subscribedUsers

        const list = await Promise.all(
            (subscribedChannels as [string]).map(async (channelId: string) => {
                return await Video.find({ userId: channelId })
            })
        )
        return list
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function tagVideo(tagsVideo: string) {
    const tags = tagsVideo.split(',')
    return await Video.find({ tags: { $in: tags } }).limit(20)
}

export async function searchVideo(input: string) {
    return await Video.find({ title: { $regex: input, $options: 'i' } }).limit(40)
}

export async function listVid(idUser: string) {
    return await Video.find({ userId: idUser })
}
