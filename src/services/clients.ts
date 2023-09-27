import { userStore } from "../store/userStore"
import api from "./api"

export const getAllClients = async () => {
    const token = userStore.getState().token;
    let {data} = await api.get("clients",{
        headers:{
            'Authorization': `Bearer ${token}`,
        }
    })
    return data;
}