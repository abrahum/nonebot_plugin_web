import Vue from "vue";
import VueSocketIO from "vue-socket.io";

export default (store) =>
    Vue.use(
        new VueSocketIO({
            debug: process.env.NODE_ENV === "development",
            connection: "/",
            vuex: {
                store,
                actionPrefix: "SOCKET_",
                mutationPrefix: 'SOCKET_',
            },
            options: {
                path: "/web_ws/socket",
                autoConnect: false,
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: store.state.envs.access_token,
                            "X-Self-ID": store.state.envs.self_id,
                        },
                    },
                },
            },
        })
    );
