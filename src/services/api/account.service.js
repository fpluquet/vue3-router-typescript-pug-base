
export const createAccount = async (data) =>
    axiosCall('/api/createAccount', {
        method: 'POST',
        body: JSON.stringify(data),
    })