import { createStore } from 'vuex'

export default createStore({
  state: {
    accountType: null,
    showSideBar: false,
    showSections: true,
    sections: [
      { id: 'dm', name: 'Datos demográficos', active: true },
      { id: 'vb', name: 'Validación biométrica', active: false },
      { id: 'de', name: 'Documentación', active: false }
    ]
  },
  mutations: {
    setShowSideBar(state, payload) {
      state.showSideBar = payload;
      state.showSections = !payload
    }
  },
  actions: {
  },
  modules: {
  }
})
