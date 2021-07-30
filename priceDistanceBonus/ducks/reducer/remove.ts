import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormError } from '@app/utils/constants/types'
import { PriceDistanceBonusRemove, RemovePriceDistanceBonus } from '../../interface'

const initialState: RemovePriceDistanceBonus = {
  listLoading: [],
  error: {
    stackErrors: null,
    message: '',
  },
}

const removeDistance = createSlice({
  name: 'removeDistance',
  initialState,
  reducers: {
    start(state, action) {
      state.listLoading = [...state.listLoading, action.payload.id]
      state.error = initialState.error
    },
    end(state, action: PayloadAction<PriceDistanceBonusRemove>) {
      state.listLoading = state.listLoading.filter((item) => item !== action.payload.id)
      state.error = initialState.error
    },
    error(state, action: PayloadAction<FormError & PriceDistanceBonusRemove>) {
      state.error.message = action.payload.message
      state.error.stackErrors = action.payload.stackErrors
      state.listLoading = state.listLoading.filter((item) => item !== action.payload.id)
    },
    clear() {
      return initialState
    },
  },
})

export const removeDistanceActions = removeDistance.actions
export default removeDistance.reducer
