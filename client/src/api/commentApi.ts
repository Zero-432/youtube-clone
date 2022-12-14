import { deleteMethod, getMethod, postMethod } from '../utils/verifyAuth'

export const addComment = (params: {}) => {
    return postMethod(`comments`, params)
}

export const deleteComment = (id: String) => {
    return deleteMethod(`comments/${id}`)
}

export const getComment = (id: string) => {
    return getMethod(`comments/${id}`)
}
