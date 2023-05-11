import {createStore} from "vuex";

export default createStore({
    state: {
        userid: localStorage.getItem('userid') || '',
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
    },

     mutations: {
        LOGIN(state, {userid, username, token, role}) {
            state.userid = userid
            state.username = username
            state.token = token
            state.role = role

            localStorage.setItem('userid', userid)
            localStorage.setItem('username', username)
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
        },

         LOGOUT(state, context) {
             state.userid = ''
             state.username = ''
             state.token = ''
             state.role = ''
            localStorage.removeItem('userid')
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
         }
     },

    getters: {

    }
})