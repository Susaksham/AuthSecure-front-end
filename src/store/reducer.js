import { configureStore } from '@reduxjs/toolkit'

import storeReducer from './store'
const store = configureStore({
  reducer: {
    auth: storeReducer,
  },
})
export default store
