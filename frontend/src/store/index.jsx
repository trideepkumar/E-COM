import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/users/authSlice"



const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  })

export default store