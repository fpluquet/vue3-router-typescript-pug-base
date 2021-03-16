import { createStore } from 'vuex'
import { SECTION_DM_ID, SECTION_VB_ID, SECTION_DOC_ID } from '../utils/constants'

export default createStore({
  state: {
    // accountType: null,
    showSideBar: false,
    showPanelSections: true,
    sections: [
      { id: SECTION_DM_ID, name: 'Datos demográficos', active: false, completed: false, routeName: 'datos-demograficos' },
      { id: SECTION_VB_ID, name: 'Validación biométrica', active: false, completed: false, routeName: 'validacion-biometrica' },
      { id: SECTION_DOC_ID, name: 'Documentación', active: false, completed: false, routeName: 'documentation' }
    ]
  },
  mutations: {
    setShowSideBar(state, payload) {
      state.showSideBar = payload;
      state.showPanelSections = !payload
    },
    setSectionActive(state, payload) {
      state.sections = state.sections.map(({ id, ...rest }) => ({
        id,
        ...rest,
        active: id === payload.id
      }));
    }
  },
  actions: {
  },
  modules: {
  }
})
