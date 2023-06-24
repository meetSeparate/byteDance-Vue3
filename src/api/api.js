/**
 * 项目总api管理
 */
import request from "./request.js";

export default {
    // 登录
    login: (data) => request({
        url: '/login/',
        method: 'post',
        data: data
    }),

    // 注册
    sign: (data) => request({
      url: '/sign/',
      method: 'post',
      data: data
    }),

    // 获取产品列表
    getProductList: (data) => request({
        url: '/product/',
        method: 'get',
        data: data
    }),

    // 获取岗位种类
    getCategory: () => request({
        url: '/category/',
        method: 'get',
    }),

    // 获取城市列表
    getCity: () => request({
        url: '/city/',
        method: 'get',
    }),

    // 获取岗位信息
    getJobList: (data) => request({
        url: '/job/',
        method: 'post',
        data: data,
    }),

    // 获取某个岗位详情
    getJobDetail: (id) => request({
        url: `/job_detail/${id}`,
        method: 'get',
    }),

    testAPI: (data) => {
        console.log(data, typeof data)
        return request({
            url: '/test/',
            method: 'post',
            data
        })
    }
}