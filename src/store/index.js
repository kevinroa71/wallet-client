import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wallet: null,
    saldo: 0
  },
  mutations: {
    initialiseStore(state) {
      let wallet = localStorage.getItem('wallet');
      if (wallet) {
        state.wallet = JSON.parse(wallet);
      }
    },
    setWallet(state, wallet) {
      state.wallet = wallet;
      localStorage.setItem('wallet', JSON.stringify(wallet));
    },
    setSaldo(state, saldo) {
      state.saldo = saldo;
    }
  },
  getters: {
    getWallet: state => {
      return state.wallet;
    },
    getSaldo: state => {
      return state.saldo;
    }
  },
  actions: {
  },
  modules: {
  }
});
