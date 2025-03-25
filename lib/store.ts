import { configureStore } from '@reduxjs/toolkit'
import { franchiseReducer } from './features/Franchisee/FranchiseeSlice'
import { ProcureReducer } from './features/Procurement/ProcurementSlice'
import { BuildingReducer } from './features/Building/BuildingSlice'
import { BusinessReducer } from './features/Business/BusinessSlice'
import { PathReducer } from './features/Path/PathSlice'
import {AuthReducer} from './features/Auth/AuthuserSlice'
import {CompanyReducer} from './features/Companies/CompanySlice'
import {SelectedCompanyReducer} from './features/Companies/SelectedCompanySlice'
import {DirectorReducer} from './features/Director/DirectorSlice'
import {TabSliceReducer} from './features/Tabprofile/TabprofileSlice'
import {createLogger} from 'redux-logger'

export const makeStore = () => {
  return configureStore({
    reducer: {
        franchiseReducer,
        ProcureReducer,
        BuildingReducer,
        BusinessReducer,
        PathReducer,
        AuthReducer,
        CompanyReducer,
        SelectedCompanyReducer,
        DirectorReducer,
        TabSliceReducer,
    },
    middleware:(GetDefaultMiddleware)=>GetDefaultMiddleware().concat(createLogger())
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']