import { PluginObject } from "vue";

const GotoBottom: PluginObject<any> = {
    install: (Vue) => {
        Object.defineProperties(Vue.prototype, {
            $gotoBottom: {
                get() {
                    const box = document.getElementsByClassName('messages-box')[0]
                    this.$nextTick(() => {
                        box.scrollTop = box.scrollHeight
                    })
                }
            },
            gotoBottom: {
                get() {
                    const box = document.getElementsByClassName('messages-box')[0]
                    this.$nextTick(() => {
                        box.scrollTop = box.scrollHeight
                    })
                }
            }
        })
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $gotoBottom: any;
        gotoBottom: any;
    }
}

export default GotoBottom