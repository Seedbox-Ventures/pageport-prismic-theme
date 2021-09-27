import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import burgerMenuReducer from '../components/page/burgerMenu/burgerMenuSlice'

export const store = configureStore({
  reducer: {
    burgerMenu: burgerMenuReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
