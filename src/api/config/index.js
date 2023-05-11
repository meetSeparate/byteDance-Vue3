/**
 * 环境配置文件
 * 开发环境
 * 生产环境
 * 测试环境
 */

// 拿到当前环境
const env = import.meta.env.MODE || 'development'

const EnvConfig = {
    development: {
        baseApi: 'http://127.0.0.1:8000/api',
        mockApi: 'https://www.fastmock.site/mock/3945196801b2b17aeb94fb84612b796a/api'
    },

    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/3945196801b2b17aeb94fb84612b796a/api'
    },

    production: {
        baseApi: '//production.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/3945196801b2b17aeb94fb84612b796a/api'
    },
}

export default {
    env,
    // mock总开关
    mock: false,
    ...EnvConfig[env]
}