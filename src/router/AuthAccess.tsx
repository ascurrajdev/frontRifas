import { ReactNode } from "react";
import {Navigate,useLocation} from 'react-router-dom'
import { userStore } from "../store/userStore";

type PropType = {
    children: ReactNode
};
export const AuthAccess = ({children} : PropType) => {
    const isLogged = userStore((value) => value.isLogged)
    const location = useLocation()
    return(
        isLogged ? (
            children
        ) : (
            <Navigate to={`/login?to=${location.pathname}`} replace={true}/>
        )
    )
}