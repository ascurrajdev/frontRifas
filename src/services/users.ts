import { userStore } from "../store/userStore";
import api from "./api";
export const searchUsers = async (search: string) => {
    const token = userStore.getState().token
    const {data} = await api.get(`users/search?q=${search}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}
export const logoutUser = async () => {
    const token = userStore.getState().token;
    const {data} = await api.post('logout',{},{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}