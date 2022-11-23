import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model'

export const createToken = (user: UserModel): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret)
}
