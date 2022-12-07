import User, { UserInput } from '../models/user.model'
import { createToken } from '../utils/token'

export async function createUser(input: UserInput) {
    try {
        const user = await new User(input)
        return user
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function login(email: string, password: string) {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to find user')
        }

        if (await user.comparePassword(password)) {
            const objUser = user.toObject()
            const { password, ...others } = objUser
            return {
                dataUser: others,
                token: createToken(user),
            }
        } else {
            throw new Error('Wrong credentials given')
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function loginGoogle(input: UserInput) {
    try {
        const user = await User.findOne({ email: input.email })
        if (user) {
            const objUser = user.toObject()
            return {
                dataUser: objUser,
                token: createToken(user),
            }
        } else {
            const newUser = new User({ ...input, fromGoogle: true })
            const savedUser = await newUser.save()
            const objUser = savedUser.toObject()
            return {
                dataUser: objUser,
                token: createToken(savedUser),
            }
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}
