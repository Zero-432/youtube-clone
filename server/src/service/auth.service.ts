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
            return createToken(user)
        } else {
            throw new Error('Wrong credentials given')
        }
    } catch (err: any) {
        throw new Error(err.message)
    }
}
