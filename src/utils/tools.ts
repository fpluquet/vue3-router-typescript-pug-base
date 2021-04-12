import { PERSONA } from '@/utils/constants'
export const getColorByAccount = (accountType: String) => accountType === PERSONA ? '#3d90e0' : '#6AC24B'
export const getClassByAccount = (accountType: String) => accountType ? accountType === PERSONA ? 'is-primary' : 'is-success' : 'is-primary'


