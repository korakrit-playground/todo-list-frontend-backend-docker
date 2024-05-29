import axios from "axios";
import tokenService from "../components/services/localStorageService";
import { notification } from "antd";

axios.defaults.baseURL = "http://localhost:8000"

// Include Bearer Token to Profile and Todo Page
axios.interceptors.request.use(
    config=>{
        if(config.url.includes("/login") || config.url.includes("/register")) return config

        const token = tokenService.getToken()
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    error=>{
        Promise.reject(error)
    }
)

// When token is expired, remove token and reload web page
axios.interceptors.response.use(
    response => {
        return response
    }, error => {
        if(error.response?.status === 401){
            notification.error({message: "Please login again"})
            tokenService.removeToken();
            window.location.reload();
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default axios