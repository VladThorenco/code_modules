import { gql } from '@apollo/client'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { FetchType, gqlProvider, Service } from '@app/utils/fetchers'

import actions from '../index'
import { GetPriceDistanceBonus } from '../../interface'

const GET_PRICE_DISTANCE = gql`
  query PriceDistanceBonuses($priceBaseProfileId: BigInteger!, $showDeleted: Boolean!) {
    priceDistanceBonuses(priceBaseProfileId: $priceBaseProfileId, showDeleted: $showDeleted) {
      bonus
      currency
      distanceMax
      distanceMin
      deleted
      id
      priceBaseProfileId
    }
  }
`

interface Props {
  payload: GetPriceDistanceBonus
}

export function* getDistance({ payload }: Props): SagaIterator {
  const { id, showDeleted } = payload
  try {
    const { priceDistanceBonuses } = yield call(
      gqlProvider,
      FetchType.query,
      Service.cargo,
      GET_PRICE_DISTANCE,
      {
        priceBaseProfileId: id,
        showDeleted,
      }
    )

    yield put(
      actions.getListDistanceActions.end({
        list: priceDistanceBonuses,
        total: priceDistanceBonuses.total,
      })
    )
  } catch ({ message, stackErrors }) {
    yield put(actions.getListDistanceActions.error({ message, stackErrors }))
  }
}

export default function* getDistanceSaga(): SagaIterator {
  yield takeLatest(actions.getListDistanceActions.start, getDistance)
}
