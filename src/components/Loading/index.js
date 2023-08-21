import {createVNode, render} from 'vue'
import Loading from './Loading.vue'

export default {
    install(app) {
        const VNode = createVNode(Loading)
        render(VNode, document.body)
    },
    show() {
        const loading = document.getElementById('loading')
        loading.style.display = 'block'
    },
    close() {
        const loading = document.getElementById('loading')
        loading.style.display = 'none'
    }
}