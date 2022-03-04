import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {setItem,getItem} from '@/utils/storage'
const HOUSEToken='house_token'
const CURRENTCITY='current_city'
const state = {
 user:getItem(HOUSEToken)||{},
 currentCity:getItem(CURRENTCITY)||{}
};
const mutations = {
  setUser(state,payload){
    state.user=payload
    setItem(HOUSEToken,payload)
  },
  setCurrentCity(state,payload){
    state.currentCity=payload
    setItem(CURRENTCITY,payload)
  }
};
const actions = {};
const getters = {};

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
});
export default store;
