import { ReactNode } from "react";
import {Navigate, useSearchParams} from 'react-router-dom'
import { userStore } from "../store/userStore";
type PropType = {
    children: ReactNode
};
export const GuestAccess = ({children} : PropType) => {
    let [searchParams] = useSearchParams();
    const isLogged = userStore((value) => value.isLogged)
    const redirect = searchParams.get('to') || "/";
    return(
        isLogged ? (
            <Navigate to={redirect} replace={true}/>
            ) : (
            children
        )
    )
}