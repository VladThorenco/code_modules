import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormError, StateInterface } from '@app/utils/constants/types'
import { CreatePriceDistanceBonus } from '../../interface'

const initialState: StateInterface = {
  loading: true,
  error: {
    stackErrors: null,
    message: '',
  },
}

const createDistance = createSlice({
  name: 'createDistance',
  initialState,
  reducers: {
    start: {
      reducer(state) {
        state.loading = true
        state.error = initialState.error
      },
      prepare(payload: CreatePriceDistanceBonus) {
        return { payload }
      },
    },
    end(state) {
      state.loading = false
      state.error = initialState.error
    },
    error(state, action: PayloadAction<FormError>) {
      state.error.message = action.payload.message
      state.error.stackErrors = action.payload.stackErrors
      state.loading = false
    },
    clear() {
      return initialState
    },
  },
})

export const createDistanceActions = createDistance.actions
export default createDistance.reducer
