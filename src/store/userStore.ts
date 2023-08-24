import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserObject{
    user: object,
    token: string,
}
interface UserState{
    user: Object,
    token: string,
    isLogged: boolean,
    login: (data: UserObject) => void
}
export const userStore = create<UserState>()(
    persist(
        (set) => ({
            user:{},
            token:"",
            isLogged:false,
            login: (data) => {
                set({
                    token: data.token,
                    user: data.user,
                    isLogged: true
                })
            }
        }),
        {
            name:'@asrifas:user'
        }
    )
)