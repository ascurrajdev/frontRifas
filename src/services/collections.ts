import { userStore } from "../store/userStore";
import api from "./api";

export const getAllCollections = async () => {
    let token = userStore.getState().token;
    let {data} = await api.get('collections',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data
}