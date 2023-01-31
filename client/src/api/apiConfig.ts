import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosConfig: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

axiosConfig.interceptors.request.use(async (config: AxiosRequestConfig) => config)

axiosConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: any) => {
        throw error
    }
)

export default axiosConfig
