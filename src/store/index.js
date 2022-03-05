import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {setItem,getItem} from '@/utils/storage'
const HOUSEToken='house_token'
const CURRENTCITY='current_city'
const HOUSEINFO='houseInfo'
const state = {
 user:getItem(HOUSEToken)||{},
 currentCity:getItem(CURRENTCITY)||{},
conditionObj:getItem(HOUSEINFO)||{}
};
const mutations = {
  setUser(state,payload){
    state.user=payload
    setItem(HOUSEToken,payload)
  },
  setCurrentCity(state,payload){
    state.currentCity=payload
    setItem(HOUSEINFO,payload)
  },
  setConditionObj(state,payload){
    state.conditionObj=payload
    setItem(HOUSEINFO,payload)
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
