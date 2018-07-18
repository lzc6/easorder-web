import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        loginstate: 0,
        name:'', 
        phonenumber:'',
    },
    mutations: {
        login (state,pare) {
            sessionStorage.setItem("name",pare.name);
            sessionStorage.setItem("phonenumber",pare.phonenumber);
            sessionStorage.setItem("isLogin",true);
            state.name = pare.name;
            state.phonenumber = pare.phonenumber;
            state.isLogin = true;
        },
        checklog(state){
             var name = sessionStorage.getItem('name');
             var phonenumber = sessionStorage.getItem('phonenumber');
            state.name = name;
            state.phonenumber = phonenumber;
            state.isLogin = true;
        },
        logout (state) {
            state.loginstate = 0 
        }
        // name (state,name){
        //     state.name = name
        // },
        // gh (state,gh) {
        //     state.gh = gh
        // }
    }
})