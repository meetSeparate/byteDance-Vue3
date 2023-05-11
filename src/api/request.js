import axios from "axios";
import config from "./config/index.js";

// 引入进度条
import nprogress from 'nprogress'

// 引入nprogress的css样式
import 'nprogress/nprogress.css'
import store from "../store/index.js";

const NETWORK_ERROR = '网络请求异常，后端未开启，请稍后重试......'

// 创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi,

    // 超时时间
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((request) => {
    // 自定义headers
    // 如果有userid，在请求头中添加
    if (store.state.userid) {
        request.headers.userid = store.state.userid
    }

    // jwt-token认证
    // 如果有token，在请求头中添加
    if (store.state.token) {
        request.headers.token = store.state.token
    }

    nprogress.start()
    return request
})

// 响应拦截器
service.interceptors.response.use((response) => {
    nprogress.done()
    const {code, data, msg} = response.data
    if (code === 200) {
        return response.data
    } else {
        // 请求错误，返回错误信息
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 封装的核心函数
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }

    // 对mock的处理
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }

    // 对线上环境的处理
    if (config.env === 'production') {
        // 拒绝使用mock
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock? config.mockApi : config.baseApi
    }

    return service(options)
}

export default request
