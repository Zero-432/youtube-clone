import axiosConfig from './apiConfig'
import { putMethod } from '../utils/verifyAuth'

export const getUser = (id: string) => {
    return axiosConfig.get(`users/find/${id}`)
}

export const addLike = (id: string) => {
    return putMethod(`users/like/${id}`)
}

export const addDislike = (id: string) => {
    return putMethod(`users/dislike/${id}`)
}

export const subscribe = (id: string) => {
    return putMethod(`users/sub/${id}`)
}

export const unsubscribe = (id: string) => {
    return putMethod(`users/unsub/${id}`)
}
