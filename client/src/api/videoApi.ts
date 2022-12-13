import axiosConfig from './apiConfig'
import { Video } from '../models/video'
import { getMethod } from '../utils/verifyAuth'

export const getListVideo = (type: string) => {
    return getMethod(`videos/${type}`)
}

export const getVideo = (id: string) => {
    return axiosConfig.get(`videos/find/${id}`)
}
