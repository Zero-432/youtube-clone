import { Document, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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
    comparePassword(password: string): Promise<Boolean>
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

UserSchema.pre<UserModel>('save', async function (next: Function) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)

    this.password = hash
    return next()
})

UserSchema.methods.comparePassword = async function (password: string): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<UserModel>('User', UserSchema)
