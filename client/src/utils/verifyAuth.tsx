import axiosConfig from '../api/apiConfig'

const userSigninData = JSON.parse(localStorage.getItem('persist:root')!).user
const token = JSON.parse(userSigninData).currentUser.token

export const getMethod = (url: string) => {
    return axiosConfig.get(url, { headers: { Authorization: `Bearer ${token}` } })
}

export const putMethod = (url: string) => {
    return axiosConfig.put(url, {}, { headers: { Authorization: `Bearer ${token}` } })
}

export const postMethod = (url: string, params: {}) => {
    return axiosConfig.post(url, params, { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteMethod = (url: string) => {
    return axiosConfig.delete(url, { headers: { Authorization: `Bearer ${token}` } })
}
