import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types"

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
