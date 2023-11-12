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
import { UsersRaffleScreen } from '../screens/raffles/UsersRaffleScreen'
import { ListClientsScreen } from '../screens/clients/ListClientsScreen'
import { ListTransactionsScreen } from '../screens/transactions/ListTransactionsScreen'
import { StoreUserRaffleScreen } from '../screens/raffles/StoreUserRaffleScreen'
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
                    <Route path=":raffleId/users" element={<UsersRaffleScreen />}/>
                    <Route path=":raffleId/users/add" element={<StoreUserRaffleScreen />} />
                </Route>
                <Route path="clients">
                    <Route path="" element={<ListClientsScreen />}/>
                </Route>
                <Route path="transactions">
                    <Route path="" element={<ListTransactionsScreen />}/>
                </Route>
            </Route>
            <Route path="/market/:token" element={<MarketScreen />}/>
            <Route path='*' element={<NotFound />}/>
        </Routes>
    )
}