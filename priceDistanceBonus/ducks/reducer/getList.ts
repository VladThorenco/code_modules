import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormError } from '@app/utils/constants/types'

import {
  GetPriceDistanceBonus,
  GetPriceDistanceBonusPayload,
  PriceDistanceBonusState,
} from '../../interface'

const initialState: PriceDistanceBonusState = {
  loading: true,
  total: 0,
  list: [],
  error: {
    stackErrors: null,
    message: '',
  },
}

const getListDistance = createSlice({
  name: 'getListDistance',
  initialState,
  reducers: {
    start: {
      reducer(state) {
        state.loading = true
        state.error = initialState.error
      },
      prepare(payload: GetPriceDistanceBonus) {
        return { payload }
      },
    },

    end(state, action: PayloadAction<GetPriceDistanceBonusPayload>) {
      state.loading = false
      state.list = action.payload.list
      state.total = action.payload.total
      state.error = initialState.error
    },
    error(state, action: PayloadAction<FormError>) {
      state.error.message = action.payload.message
      state.error.stackErrors = action.payload.stackErrors
      state.loading = false
      state.list = initialState.list
    },
    clear() {
      return initialState
    },
  },
})

export const getListDistanceActions = getListDistance.actions
export default getListDistance.reducer
