import axiosConfig from './apiConfig'
import { deleteMethod, getMethod, postMethod } from '../utils/verifyAuth'

export const getListVideo = (type: string) => {
    return getMethod(`videos/${type}`)
}

export const getVideo = (id: string) => {
    return axiosConfig.get(`videos/find/${id}`)
}

export const addVideo = (params: {}) => {
    return postMethod(`videos`, params)
}

export const addView = (id?: string) => {
    return axiosConfig.put(`videos/view/${id}`)
}

export const deleteVideo = (id?: string) => {
    return deleteMethod(`videos/${id}`)
}

export const tagVideo = (tags: [string]) => {
    return axiosConfig.get(`/videos/tags?tags=${tags}`)
}

export const searchVideo = (query: string) => {
    return axiosConfig.get(`/videos/search${query}`)
}
