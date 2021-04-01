import { EMAIL_ALREADY_EXIST, INVALID_USER_RUT } from './constants'

export const errorCodes = new Map([
    [EMAIL_ALREADY_EXIST, 'Este email ya ha sido registrado.'],
    [INVALID_USER_RUT, 'El formato del rut  no es correcto.']
]);