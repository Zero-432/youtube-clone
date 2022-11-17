import { Document, model, Schema } from 'mongoose'

export interface CommentInput {
    desc: string
}

export interface CommentModel extends CommentInput, Document {
    userId: string
    videoId: string
}

const CommentSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model<CommentModel>('Comment', CommentSchema)
