import axiosConfig from './apiConfig'
import { User } from '../models/user'

export const getUser = (id: string) => {
    return axiosConfig.get(`users/find/${id}`)
}
