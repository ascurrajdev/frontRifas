import api from "./api";

interface CredentialsObject {
    email: string,
    password: string,
}
export const loginWithEmailAndPassword = async (credentials: CredentialsObject) => {
    const {data} = await api.post(`/login`,credentials)
    return data
}