import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import burgerMenuReducer from '../modules/burgerMenu/burgerMenuSlice'
import dataProtectionReducer from '../modules/userDataManagement/userDataSlice'

export const store = configureStore({
  reducer: {
    burgerMenu: burgerMenuReducer,
    dataProtection: dataProtectionReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
