import { EMAIL_ALREADY_EXIST, INVALID_USER_RUT, INVALID_CODE, LIMIT_EXCEEDED } from './constants'


class DefaultMap {
    private items: Map<any, any>;
    private defaultValue: any;
    constructor(items: Array<any>, defaultValue?: any) {
        this.items = new Map<any, any>(items);
        this.defaultValue = defaultValue;
    }
    get(key: any, defaultValue?: any) {
        return this.items.has(key) ? this.items.get(key) : (defaultValue || this.defaultValue)
    }
}


export const errorCodes = new DefaultMap([
    [EMAIL_ALREADY_EXIST, 'Este email ya ha sido registrado.'],
    [INVALID_USER_RUT, 'El formato del rut del usuario no es correcto.'],
    [INVALID_CODE, 'El código ingresado no es válido.'],
    [LIMIT_EXCEEDED, 'Ha alcanzo la cantidad de máxima de intentos.']
]);


