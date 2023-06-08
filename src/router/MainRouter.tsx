import {Routes, Route} from 'react-router-dom'
import { MainScreen } from '../screens/MainScreen'
import { NotFound } from '../screens/NotFound'
export function MainRouter(){
    return(
        <Routes>
            <Route path="/:hashId" element={<MainScreen />}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}