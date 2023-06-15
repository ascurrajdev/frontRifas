import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserState{
    user: Object,
    token: string,
    isLogged: boolean
}
export const userStore = create<UserState>()(
    persist(
        (set) => ({
            user:{},
            token:"",
            isLogged:false
        }),
        {
            name:'@asrifas:user'
        }
    )
)