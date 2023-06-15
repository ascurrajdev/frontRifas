import {Routes, Route} from 'react-router-dom'
import { MarketScreen } from '../screens/MarketScreen'
import { NotFound } from '../screens/NotFound'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { HomeScreen } from '../screens/HomeScreen'
export function MainRouter(){
    return(
        <Routes>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/home" element={<HomeScreen />}/>
            <Route path="/market/:token" element={<MarketScreen />}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}