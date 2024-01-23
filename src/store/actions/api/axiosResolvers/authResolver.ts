import axios from "axios";
import { response } from "express";

const axiosAuthResolver = axios.create({
    baseURL: 'http://localhost:3030',
    headers: { 'Content-Type': 'application/json' }
})

axiosAuthResolver.interceptors.request.use(request => {
    const authToken = localStorage.getItem('auth_token')
    if(authToken) {
        request.headers.Authorization = `Bearer ${ authToken }`
    }
    return request
})

axiosAuthResolver.interceptors.response.use(null, error => {
    return error
})

export default axiosAuthResolver
