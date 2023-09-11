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

export const statisticsRaffles = async (raffleId: string) => {
    const token = userStore.getState().token;
    let {data} = await api.get(`raffles/${raffleId}/statistics`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}

export const getAdminUsersRaffles = async (raffleId: string) => {
    const token = userStore.getState().token
    let {data} = await api.get(`raffles/${raffleId}/admin`, {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}