import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../state/store'

export interface BurgerMenuState {
  isOpen: boolean
}

const initialState: BurgerMenuState = {
  isOpen: false,
}

export const burgerMenuSlice = createSlice({
  name: 'burgerMenu',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const selectIsOpen = (state: RootState) => state.burgerMenu.isOpen

export const openMenu = (): AppThunk => (dispatch, getState) => {
  const { setIsOpen } = burgerMenuSlice.actions
  const isAlreadyOpen = selectIsOpen(getState())

  if (isAlreadyOpen === true) return
  dispatch(setIsOpen(true))
}

export const closeMenu = (): AppThunk => (dispatch, getState) => {
  const { setIsOpen } = burgerMenuSlice.actions
  const isAlreadyOpen = selectIsOpen(getState())

  if (!isAlreadyOpen) return
  dispatch(setIsOpen(false))
}

export const toggleMenu = (): AppThunk => (dispatch, getState) => {
  const isCurrentlyOpen = selectIsOpen(getState())
  if (!isCurrentlyOpen) {
    dispatch(openMenu())
    return
  }
  dispatch(closeMenu())
}

export default burgerMenuSlice.reducer
