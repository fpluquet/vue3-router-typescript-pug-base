import { PERSONA } from '@/utils/constants'
export const getColorByAccount = (accountType: String) => accountType === PERSONA ? '#3d90e0' : '#35A96A'
export const getClassByAccount = (accountType: String) => accountType ? accountType === PERSONA ? 'is-primary' : 'is-success' : 'is-primary'


