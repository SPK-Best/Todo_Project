export default ({
    state: {
        user: {
            loggedIn: false,
            data: null,
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setLogin(state, value) {
            state.user.loggedIn = value;
        },
        setUser(state, data) {
            state.user.data = data;
        },
        setLogout(state, data) {
            state.user.loggedIn = data;
        },
    },
    actions: {
        userRegister({ commit }, payload) {
            commit('setUser', { payload });
        },
        userLogin({ commit }, payload) {
            commit('setLogin', payload !== null);
        },
        userLogout({ commit }, payload) {
            commit('setLogout', payload);
            commit('setUser', null);
        },
    },
});