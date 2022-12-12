import axiosConfig from './apiConfig'
import { User } from '../models/user'

export const getUser = (id: string) => {
    return axiosConfig.get(`users/find/${id}`)
}

export const addLike = (id: string, token: string) => {
    return axiosConfig.put(`users/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
}

export const addDislike = (id: string, token: string) => {
    return axiosConfig.put(`users/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
}
