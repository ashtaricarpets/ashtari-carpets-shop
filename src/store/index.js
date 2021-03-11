import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules,
	plugins: [
		createPersistedState({
			key: 'AshtariCarpets',
		}),
	],
});
