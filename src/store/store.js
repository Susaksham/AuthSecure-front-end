import { createSlice } from '@reduxjs/toolkit'
// export const useAuthStore = create((set) => ({
//   auth: {
//     username: '',
//   },
//   setUsername: (name) => {
//     return set((state) => ({ auth: { ...state.auth, username: name } }))
//   },
// }))
const slice = createSlice({
  name: 'slicename',
  initialState: {
    username: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
  },
})
export const reducerAction = slice.actions
export default slice.reducer
