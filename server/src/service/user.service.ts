import User, { UserInput } from '../models/user.model'
import Video from '../models/video.model'

export async function updateUser(id: string, input: UserInput) {
    return User.findByIdAndUpdate(
        id,
        {
            $set: input,
        },
        { new: true }
    )
}

export async function deleteUser(id: string) {
    return User.findByIdAndDelete(id)
}

export async function getUser(id: string) {
    return User.findById(id)
}

export async function subscribeUser(idUser: string, idOther: string) {
    const subscribe = {
        subscribeUser: User.findByIdAndUpdate(idUser, {
            $push: { subscribedUsers: idOther },
        }),
        subscriber: User.findByIdAndUpdate(idOther, {
            $inc: { subscribers: 1 },
        }),
    }

    return subscribe
}

export async function unsubscribeUser(idUser: string, idOther: string) {
    const unsubscribe = {
        subscribeUser: User.findByIdAndUpdate(idUser, {
            $pull: { subscribedUsers: idOther },
        }),
        subscriber: User.findByIdAndUpdate(idOther, {
            $inc: { subscribers: -1 },
        }),
    }

    return unsubscribe
}

export async function likeVideo(idUser: string, idVideo: string) {
    return await Video.findByIdAndUpdate(idVideo, {
        $addToSet: { likes: idUser },
        $pull: { dislikes: idUser },
    })
}

export async function dislikeVideo(idUser: string, idVideo: string) {
    return await Video.findByIdAndUpdate(idVideo, {
        $addToSet: { dislikes: idUser },
        $pull: { likes: idUser },
    })
}
