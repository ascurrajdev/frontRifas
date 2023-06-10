import {Routes, Route} from 'react-router-dom'
import { MainScreen } from '../screens/MainScreen'
import { NotFound } from '../screens/NotFound'
import { LoginScreen } from '../screens/auth/LoginScreen'
export function MainRouter(){
    return(
        <Routes>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/market/:token" element={<MainScreen />}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}