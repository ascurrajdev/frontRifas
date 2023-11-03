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

export const getRaffle = async (raffleId: string) => {
    const token = userStore.getState().token;
    let {data} = await api.get(`raffles/${raffleId}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}
export const deleteRaffle = async (raffleId: string|number) => {
    const token = userStore.getState().token;
    let {data} = await api.delete(`raffles/${raffleId}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}
export const updateRaffle = async (raffleId: string|number, body: any) => {
    const token = userStore.getState().token;
    let {data} = await api.put(`raffles/${raffleId}`,body,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}
export const addRaffle = async (body: any) => {
    const token = userStore.getState().token;
    let {data} = await api.post(`raffles`,body,{
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

export const getUsersRaffles = async (raffleId: string) => {
    const token = userStore.getState().token;
    let {data} = await api.get(`raffles/${raffleId}/users`,{
        headers: {
            'Authorization':`Bearer ${token}`
        }
    })
    return data;
}