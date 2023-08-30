import {Routes, Route} from 'react-router-dom'
import { MarketScreen } from '../screens/MarketScreen'
import { NotFound } from '../screens/NotFound'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { ListRafflesScreen } from '../screens/raffles/ListRafflesScreen'
import { LayoutScreen } from '../screens/LayoutScreen'
import { StatisticsRaffle } from '../screens/raffles/StatisticsRaffle'
import { GuestAccess } from './GuestAccess'
import { AuthAccess } from './AuthAccess'
import { EditRaffleScreen } from '../screens/raffles/EditRaffleScreen'
import { StoreRaffleScreen } from '../screens/raffles/StoreRaffleScreen'
export function MainRouter(){
    return(
        <Routes>
            <Route path="/login" element={ 
                <GuestAccess>
                    <LoginScreen />
                </GuestAccess>
            }/>
            <Route path="/" element={
                <AuthAccess>
                    <LayoutScreen />
                </AuthAccess>
            }>
                <Route path="" element={<HomeScreen />}/>
                <Route path="home" element={<HomeScreen />}/>
                <Route path="raffles">
                    <Route path="" element={<ListRafflesScreen />}/>
                    <Route path="add" element={<StoreRaffleScreen />}/>
                    <Route path=":raffleId/statistics" element={<StatisticsRaffle />}/>
                    <Route path=":raffleId/edit" element={<EditRaffleScreen />}/>
                </Route>
            </Route>
            <Route path="/market/:token" element={<MarketScreen />}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}