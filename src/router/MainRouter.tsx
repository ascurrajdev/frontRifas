import {Routes, Route} from 'react-router-dom'
import { MarketScreen } from '../screens/MarketScreen'
import { NotFound } from '../screens/NotFound'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { ListRafflesScreen } from '../screens/raffles/ListRafflesScreen'
import { LayoutScreen } from '../screens/LayoutScreen'
import { StatisticsRaffle } from '../screens/raffles/StatisticsRaffle'
export function MainRouter(){
    return(
        <Routes>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/" element={<LayoutScreen />}>
                <Route path="" element={<HomeScreen />}/>
                <Route path="home" element={<HomeScreen />}/>
                <Route path="raffles">
                    <Route path="" element={<ListRafflesScreen />}/>
                    <Route path=":raffleId/statistics" element={<StatisticsRaffle />}/>
                </Route>
            </Route>
            <Route path="/market/:token" element={<MarketScreen />}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}