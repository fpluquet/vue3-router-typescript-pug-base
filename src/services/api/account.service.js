import { axiosCall } from './axios'


export const createAccount = async (data) =>
    axiosCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    })



export const sendCode = async (data) =>
    axiosCall('/verify/email', {
        method: 'POST',
        body: data,
    })

export const resendCode = async (data) =>
    axiosCall('/verify/email/resend', {
        method: 'POST',
        body: data,
    })