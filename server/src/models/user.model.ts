import { Document, model, Schema } from 'mongoose'

export interface UserInput {
    name: string
    email: string
    password: string

}

export interface UserModel extends UserInput, Document {
    img: string
    subscribers: number
    subscribedUsers: [string]
    fromGoogle: boolean
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        img: {
            type: String,
        },
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
        },
        fromGoogle: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export default model<UserModel>('User', UserSchema)
