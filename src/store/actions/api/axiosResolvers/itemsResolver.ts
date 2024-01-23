import axios from "axios";
import axiosAuthResolver from "./authResolver";

const axiosItemsResolver = axios.create({
    baseURL: 'http://localhost:3030',
    headers: { 'Content-Type': 'application/json' }
})

axiosItemsResolver.interceptors.request.use(request => {
    const authToken = localStorage.getItem('auth_token')
    if(authToken) {
        request.headers.Authorization = `Bearer ${ authToken }`
    }
    return request
})

axiosItemsResolver.interceptors.response.use(null, async (error) => {
    if(error.response?.status === 403) {
        const request = error.config
        const response = await axiosAuthResolver.get('/api/auth')
        if(response.status !== 200) return response
        localStorage.setItem('auth_token', response.headers.authorization.split(' ')[1])
        const requestResult = await axiosItemsResolver(request)
        return requestResult
    } 
    return error
})

export default axiosItemsResolver