import axiosConfig from '../api/apiConfig'

const userSigninData = JSON.parse(localStorage.getItem('persist:root')!).user
const token = JSON.parse(userSigninData).currentUser.token

export const putMethod = (url: string) => {
    return axiosConfig.put(url, {}, { headers: { Authorization: `Bearer ${token}` } })
}
