import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { manipulatorApi } from "./api"
import authSlice from "./slices/authSlice"
import manipulatorSlice from "./slices/manipulatorSlice"
import samplesSlice from "./slices/samplesSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    manipulator: manipulatorSlice,
    samples: samplesSlice,
    [manipulatorApi.reducerPath]: manipulatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(manipulatorApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
