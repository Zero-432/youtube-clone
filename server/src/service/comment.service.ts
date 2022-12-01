import Comment, { CommentModel } from '../models/comment.model'
import Video from '../models/video.model'

export async function add(idUser: string, input: CommentModel) {
    return await new Comment({ ...input, userId: idUser })
}

export async function delComment(idComment: string, idUser: string) {
    const comment = await Comment.findById(idComment)
    const video = await Video.findById(comment?.videoId)

    if (idUser === comment?.userId || idUser === video?.userId) {
        return Comment.findByIdAndDelete(idComment)
    } else {
        throw new Error('You can delete only your comment!')
    }
}

export async function getCmt(idVideo: string) {
    return await Comment.find({ videoId: idVideo })
}
