import axios from 'axios'
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user: null,        
    },
    mutations: {
        setUser(state, user){
            state.user = user
            
            if(user){
                axios.defaults.headers.common = {'Authorization' : `Bearer ${user.token}`}
                
            }else {
                delete axios.defaults.headers.common['Authorization']
            }
        },
        nomeUser(state, user){
            state.user = user
        }
    },
    getters: {
        user: state => state.user
    }
})