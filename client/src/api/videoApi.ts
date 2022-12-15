import axiosConfig from './apiConfig'
import { Video } from '../models/video'
import { getMethod, postMethod } from '../utils/verifyAuth'

export const getListVideo = (type: string) => {
    return getMethod(`videos/${type}`)
}

export const getVideo = (id: string) => {
    return axiosConfig.get(`videos/find/${id}`)
}

export const addVideo = (params: {}) => {
    return postMethod(`videos`, params)
}
