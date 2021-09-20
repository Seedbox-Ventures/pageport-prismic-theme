import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../state/store'

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
    openMenu: (state) => {
      state.isOpen = true
    },
    closeMenu: (state) => {
      state.isOpen = false
    },
    toggleMenu: (state) => {
      state.isOpen = state.isOpen === true ? false : true
    },
  },
})

export const { toggleMenu } = burgerMenuSlice.actions

export const selectIsOpen = (state: RootState) => state.burgerMenu.isOpen

export default burgerMenuSlice.reducer
