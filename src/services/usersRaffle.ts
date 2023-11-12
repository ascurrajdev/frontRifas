import { userStore } from "../store/userStore";
import api from "./api";
type DataStoreUserRaffle = {
    user_id: number,
    min_number: number,
    max_number: number
}
export async function storeUserRaffle(dataStore: DataStoreUserRaffle, raffleId: string){
    const token = userStore.getState().token
    const {data} = await api.post(`raffles/${raffleId}/users`,dataStore,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}