import api from "./api";
import { userStore } from "../store/userStore";
export const listAllRaffles = async () => {
    const token = userStore.getState().token;
    let {data} = await api.get(`raffles`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}