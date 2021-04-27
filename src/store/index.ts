import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { SECTION_DM_ID, SECTION_VB_ID, SECTION_DOC_ID } from '../utils/constants'

export default createStore({
  state: {
    profile: {},
    currentStep:1,
    account: {
      cognitoId: null,
      type: null,
    },
    globalPercentage: 0,
    showPanelSections: true,
    sections: [
      { id: SECTION_DM_ID, name: 'Datos demográficos', active: true, routeName: 'datos-generales', percentCompleted: 0 },
      { id: SECTION_VB_ID, name: 'Validación biométrica', active: false, routeName: 'validacion-biometrica', percentCompleted: 0 },
      { id: SECTION_DOC_ID, name: 'Documentación', active: false, routeName: 'documentacion', percentCompleted: 0 }
    ]
  },
  mutations: {
    setCognitoId(state, payload) {
      state.account = {
        ...state.account,
        cognitoId: payload.cognitoId
      }
    },
    setAccountType(state, payload) {
      state.account = {
        ...state.account,
        type: payload.accountType,
      }
    },

    setSectionActive(state, payload) {
      state.sections = state.sections.map(({ id, ...rest }) => ({
        id,
        ...rest,
        active: id === payload.id
      }));
    },
    setSectionPercentage(state, payload) {
      state.sections = state.sections.map(({ id, percentCompleted, ...rest }) => ({
        id,
        ...rest,
        percentCompleted: id === payload.id ? payload.percentCompleted : percentCompleted,
      }));
    },
    setGlobalPercent(state, payload) {
      state.globalPercentage = payload.globalPercentage
    },
    setProfile(state, payload) {
      state.profile = {
        ...state.profile,
        ...payload
      }
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
     paths: ['profile']
  })],
})
