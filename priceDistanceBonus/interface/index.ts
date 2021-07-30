import { FormError, StateInterface } from '@app/utils/constants/types'
import { Currency } from '@app/utils/constants/enums'

export interface PriceDistanceBonus extends StateInterface {
  id?: number
  bonus: number
  currency: Currency
  distanceMax: number
  distanceMin: number
}
export interface PriceDistanceBonusState extends StateInterface {
  list: PriceDistanceBonus[]
  total: number
}

export interface RemovePriceDistanceBonus {
  listLoading: number[]
  error: FormError
}

export interface PriceDistanceBonusRemove {
  id: number
  priceBaseProfileId?: number
}

export interface PriceDistanceBonusUpdate {
  priceBaseProfileId?: number
  id: number
  request: PriceDistanceBonus
}

export interface GetPriceDistanceBonusPayload {
  list: []
  total: number
}

export interface GetPriceDistanceBonus {
  id: number
  showDeleted: boolean
}

export interface PriceDistanceBonusCreate {
  bonus: number
  currency: Currency
  distanceMax: number
  distanceMin: number
}

export interface CreatePriceDistanceBonus {
  id: number
  request: PriceDistanceBonusCreate
}

interface RootReducer {
  getList: PriceDistanceBonusState
  remove: RemovePriceDistanceBonus
  create: CreatePriceDistanceBonus
  update: PriceDistanceBonusUpdate
}

interface RootState {
  priceDistanceBonus: RootReducer
}

export default RootState
