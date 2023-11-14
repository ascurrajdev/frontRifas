import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logoutUser } from "../services/users";
interface UserObject{
    user: UserDto,
    token: string,
}
type UserDto = {
    id: number,
    name: string,
}
interface UserState{
    user: UserDto | null,
    token: string | null,
    isLogged: boolean,
    login: (data: UserObject) => void,
    logout: () => void,
}
export const userStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLogged:false,
            login: (data) => {
                set({
                    token: data.token,
                    user: data.user,
                    isLogged: true
                })
            },
            logout: async () => {
                await logoutUser()
                set({
                    token: null,
                    user: null,
                    isLogged: false,
                })
            }
        }),
        {
            name:'@asrifas:user'
        }
    )
)