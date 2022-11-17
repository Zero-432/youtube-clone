import { Document, model, Schema } from 'mongoose'

export interface VideoInput {
    title: string
    desc: string
    imgUrl: string
    videoUrl: string
}

export interface VideoModal extends VideoInput, Document {
    userId: string
    views: number
    tags: [string]
    likes: [string]
    dislikes: [string]
}

const VideoSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: {
            type: [String],
            default: [],
        },
        dislikes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
)

export default model<VideoModal>('Video', VideoSchema)
