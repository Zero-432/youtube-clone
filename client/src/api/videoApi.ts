import axiosConfig from './apiConfig'
import { Video } from '../models/video'

export const getListVideo = (type: string) => {
    return axiosConfig.get(`videos/${type}`)
}

export const getVideo = (id: string) => {
    return axiosConfig.get(`videos/find/${id}`)
}
