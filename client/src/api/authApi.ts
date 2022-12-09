import axiosConfig from './apiConfig'

export const signup = (params: {}) => {
    return axiosConfig.post('auth/signup', params)
}

export const signin = (params: {}) => {
    return axiosConfig.post('auth/signin', params)
}

export const googleSignin = (params: {}) => {
    return axiosConfig.post('auth/google', params)
}
