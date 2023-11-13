import { userStore } from "../store/userStore";
import api from "./api";

export const getGeneralStatistics = async () => {
    const token = userStore.getState().token;
    const {data} = await api.get('statistics/general',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    return data;
}