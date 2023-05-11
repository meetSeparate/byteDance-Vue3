/**
 * 项目总api管理
 */
import request from "./request.js";

export default {
    login: (data) => request({
        url: '/login/',
        method: 'post',
        data: data
    }),

    sign: (data) => request({
      url: '/sign/',
      method: 'post',
      data: data
    })
}