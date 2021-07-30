import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {},
  loading: true,
  error: {
    stackErrors: null,
    message: '',
  },
}
const updateDistance = createSlice({
  name: 'updateDistance',
  initialState,
  reducers: {
    start: {
      reducer(state) {
        state.loading = true
        state.error = initialState.error
      },
      prepare(payload) {
        return { payload }
      },
    },
    end(state) {
      state.error = initialState.error
      state.items = []
      state.loading = false
    },
    error(state, action) {
      state.loading = false
      state.error.message = action.payload.message
      state.error.stackErrors = action.payload.stackErrors
    },
    clear() {
      return initialState
    },
  },
})

export const updateDistanceActions = updateDistance.actions
export default updateDistance.reducer
